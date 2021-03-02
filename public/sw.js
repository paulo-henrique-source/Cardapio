const SERVICE_WORKER_VERSION = 'REPLACED_WITH_SERVICE_WORKER_VERSION' // updated with tools/service_worker_version.js (String)
const CACHE_VERSION = SERVICE_WORKER_VERSION
const fileNamesToSaveInCache = ['/']
const HOME = '/'
const OFFLINE_ALTERNATIVE = '/offline'
// const fileNamesToSaveInCache /* for dev don't use cache */ = [];
const fileNamesToSaveInCacheProd = [
  /*"/", not included to enable the offline page support to appear,
    todo change mechanism*/
  OFFLINE_ALTERNATIVE,
  '/',
  './src/content/index.js',
  './src/content/styles.css',
  './routes/global.css',
  './public',
]
const rtcLength = 4 // "rtc/".length;
const rtcFetchDelay = 10000 //ms
const origin = location.origin
const answerFromfileName = {}
const resolveFromfileName = {}
const rejectFromfileName = {}
const timeOutIdFromfileName = {}
let logLater = []

const resolveFetchFromPeerToPeer = function (fileName) {
  clearTimeout(timeOutIdFromfileName[fileName])
  resolveFromfileName[fileName](answerFromfileName[fileName])
  delete answerFromfileName[fileName] //stop listening
  delete resolveFromfileName[fileName]
  delete rejectFromfileName[fileName]
}

const rejectFetchFromPeerToPeer = function (fileName, reason) {
  if (rejectFromfileName[fileName]) {
    rejectFromfileName[fileName](reason)
    delete resolveFromfileName[fileName]
    delete rejectFromfileName[fileName]
  }
}

const fetchFromPeerToPeer = function (customRequestObject) {
  const fileName = customRequestObject.header.fileName

  const promise = new Promise(function (resolve, reject) {
    resolveFromfileName[fileName] = resolve
    rejectFromfileName[fileName] = reject
    if (answerFromfileName.hasOwnProperty(fileName)) {
      resolveFetchFromPeerToPeer(fileName)
    }
    timeOutIdFromfileName[fileName] = setTimeout(function () {
      rejectFetchFromPeerToPeer(fileName, 'No answer after 10 seconds')
    }, rtcFetchDelay)
  })

  self.clients.matchAll().then(function (clientList) {
    clientList.forEach(function (client) {
      client.postMessage(customRequestObject)
    })
  })
  return promise
}

const logInTheUI = (function () {
  return function (what) {
    self.clients.matchAll().then(function (clientList) {
      clientList.forEach(function (client) {
        client.postMessage({ LOG: JSON.parse(JSON.stringify(what)) })
      })
    })
  }
})()

const logInTheUIWhenActivated = function (what) {
  logLater.push(what)
}

const fetchFromMainServer = function (request, options = {}) {
  return fetch(request, options).then(function (fetchResponse) {
    if (!fetchResponse || !fetchResponse.ok) {
      return Promise.reject('fetch failed')
    }
    return fetchResponse
  })
}

const fetchFromCache = function (request) {
  return caches.open(CACHE_VERSION).then(function (cache) {
    return cache.match(request).then(function (CacheResponse) {
      window.location.reload()

      if (!CacheResponse || !CacheResponse.ok) {
        return Promise.reject('Not in Cache')
      }
      return CacheResponse
    })
  })
}

const isLocalURL = function (url) {
  return !String(url).match('rtc')
}

const fillServiceWorkerCache2 = function () {
  return caches.open(CACHE_VERSION).then(function (cache) {
    return Promise.all(
      fileNamesToSaveInCache.map(function (url) {
        return cache.add(url).catch(function (reason) {
          return logInTheUIWhenActivated([url + 'failed: ' + String(reason)])
        })
      })
    )
  })
}

const latePutToCache = function (request, response) {
  return caches.open(CACHE_VERSION).then(function (cache) {
    cache.put(request, response.clone())
    return response
  })
}

const deleteServiceWorkerOldCache = function () {
  return caches.keys().then(function (cacheVersions) {
    return Promise.all(
      cacheVersions.map(function (cacheVersion) {
        if (CACHE_VERSION === cacheVersion) {
        } else {
          return caches.delete(cacheVersion)
        }
      })
    )
  })
}

const useOfflineAlternative = function () {
  return fetchFromCache(new Request(OFFLINE_ALTERNATIVE))
}

const isAppPage = function (url) {
  /*appPage does not work offline, and we don't serve it if offline
    returns Boolean*/
  return origin + HOME === url
}

self.addEventListener('install', function (event) {
  /*the install event can occur while another service worker is still active
    waitUntil blocks the state (here installing) of the service worker until the
    promise is fulfilled (resolved or rejected). It is useful to make the service worker more readable and more deterministic
    save in cache some static fileNames
    this happens before activation */
  event.waitUntil(fillServiceWorkerCache2().then(skipWaiting))
})

self.addEventListener('activate', function (event) {
  /* about to take over, other service worker are killed after activate, syncronous
    a good moment to clear old cache*/
  event.waitUntil(
    deleteServiceWorkerOldCache().then(function () {
      return self.clients.claim()
    })
  )
})

self.addEventListener('message', function (event) {
  const message = event.data
  /*
    if (message.hasOwnProperty("FUTURE")) {
        return;
    }
    */
  const fileName = message.fileName
  const answer = message.answer
  answerFromfileName[fileName] = answer
  if (resolveFromfileName.hasOwnProperty(fileName)) {
    //
    resolveFetchFromPeerToPeer(fileName)
  }
})

self.addEventListener('fetch', function (fetchEvent) {
  /* fetchEvent interface FetchEvent
    see https://www.w3.org/TR/service-workers/#fetch-event-interface
    IMPORTANT: fetchEvent.respondWith must be called inside this handler immediately
    synchronously fetchEvent.respondWith must be called with a response object or a
    promise that resolves with a response object. if fetchEvent.respondWith is called
    later in a callback the browser will take over and asks the remote server directly, do not do that
    why have fetchEvent.respondWith( and not respond with the return value of the callback function ?
    -->
    It allows to do other thing before killing the service worker, like saving stuff in cache
    */
  const request = fetchEvent.request //Request implements Body;
  //const requestClone = request.clone(); //no need to clone ?
  const url = request.url
  if (logLater) {
    logLater.forEach(logInTheUI)
    logLater = undefined
  }
  // logInTheUI(["fetch service worker " + SERVICE_WORKER_VERSION, fetchEvent]);
  // Needs to activate to handle fetch
  if (isLocalURL(url)) {
    //Normal Fetch

    if (request.method === 'POST') {
      // logInTheUI(["POST ignored", request]);
      return
    }

    // logInTheUI(["Normal Fetch"]);
    fetchEvent.respondWith(
      fetchFromCache(request.clone())
        .then(function (cacheResponse) {
          /* cannot use request again from here, use requestClone */
          return cacheResponse
        })
        .catch(function (reason) {
          // We don't have it in the cache, fetch it
          // logInTheUI(fetchEvent);
          return fetchFromMainServer(request)
        })
        .then(function (mainServerResponse) {
          if (isAppPage(url)) {
            return mainServerResponse
          }
          return latePutToCache(request, mainServerResponse).catch(function (
            reason
          ) {
            /*failed to put in cache do not propagate catch, not important enough*/
            return mainServerResponse
          })
        })
        .catch(function (reason) {
          if (isAppPage(url)) {
            //if it is the landing page that is asked
            return useOfflineAlternative()
            //todo if we are offline , display /offline directly
          }
          return Promise.reject(reason)
        })
    )
  } else {
    // Peer to peer Fetch
    // request, url are defined
    const method = request.method
    const requestHeaders = request.headers

    //logInTheUI(["Special Fetch"]);
    const customRequestObject = {
      header: {
        fileName: url.substring(url.indexOf('rtc/') + rtcLength),
        method,
      },
      body: '',
    }
    requestHeaders.forEach(function (value, key) {
      //value, key correct order
      //is there a standard way to use Object.assign with Map like iterables ?
      //todo handle duplicates
      //https://fetch.spec.whatwg.org/#terminology-headers
      customRequestObject.header[key] = value
    })

    fetchEvent.respondWith(
      /*should provide the peer the full request*/
      request
        .arrayBuffer()
        .then(function (bodyAsArrayBuffer) {
          const bodyUsed = request.bodyUsed
          if (bodyUsed && bodyAsArrayBuffer) {
            customRequestObject.body = bodyAsArrayBuffer
          }
        })
        .catch(function (reason) {})
        .then(function (notUsed) {
          return fetchFromPeerToPeer(customRequestObject)
        })
        .then(function (response) {
          const responseInstance = new Response(response.body, {
            headers: response.header,
            status: response.header.status || 200,
            statusText: response.header.statusText || 'OK',
          })

          return responseInstance
        })
        .catch(function (error) {
          const responseInstance = new Response(
            `<html><p>${error}</p></html>`,
            {
              headers: {
                'Content-type': 'text/html',
              },
              status: 500,
              statusText: 'timedout',
            }
          )

          return responseInstance
        })
    )
  }

  /*here we could do more with event.waitUntil()*/
})
