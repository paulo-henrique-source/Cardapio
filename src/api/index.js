import Send from '../config/index'

export const methodGET = async (url) => {
  try {
    const request = {
      url: url,
      method: 'GET',
    }
    const { status, data } = await Send(request)
    if (status !== 200) {
      console.error('Server Blocked')
    } else if (data) {
      return data
    }
  } catch (error) {
    console.warn(error)
  }
}

export const methodPUT = async (url, array) => {
  const request = {
    url: url,
    data: array,
    method: 'PUT',
  }
  const { status, data } = await Send(request)
  if (status !== 201) {
    console.error(status)
    console.error('Server Blocked')
  } else {
    return data['result'][0]
  }
}

export const methodPOST = async (url, array) => {
  const request = {
    url: url,
    data: array,
    method: 'POST',
  }
  const { status, data } = await Send(request)
  if (status !== 200) {
    console.error('Server Blocked')
  } else {
    return data
  }
}
