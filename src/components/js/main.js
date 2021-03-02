import React, { useEffect } from 'react'
import Swal from 'sweetalert2'

function Main() {
  var myPrompt

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration)
          console.log('SW scope:', registration.scope)
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError)
        })
    })
  }

  window.onload = function () {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      myPrompt = e
    })

    Swal.fire({
      title: 'Deseja Adicionar a tela Inicial?',
      showDenyButton: true,
      denyButtonText: `Não Adicionar`,
      confirmButtonText: `Adicionar`,
    }).then((result) => {
      if (result.isConfirmed) {
        myPrompt.prompt()
        myPrompt.userChoice.then((choiceResult) => {
          if (choiceResult === 'accepted') {
            console.log('Usuário aceitou o prompt')
          }
        })
      } else if (result.isDenied) {
        console.log('Usuário cancelou o prompt')
      }
    })
  }

  return <h1 className="hyper">Heloo</h1>
}

export default Main

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js').then((registration) => {
//       console.log('SW registered: ', registration);
//     }).catch((registrationError) => {
//       console.log('SW registration failed: ', registrationError);
//     });
//   });
// }

// var myPrompt;

// window.onload = function () {
// const pwaAlert = document.querySelector('.pwa__alert');
// const btnPWA = document.querySelector('.pwa__alert__btn');

// window.addEventListener('beforeinstallprompt', (e) => {
//   e.preventDefault();
//   console.log('pronto para instalar', e);
//   myPrompt = e;
//   pwaAlert.style.display = 'block';
// });

// btnPWA.addEventListener('click', () => {
//   pwaAlert.style.display = 'none';
//   myPrompt.prompt();
//   myPrompt.userChoice
//     .then((choiceResult) => {
//       if (choiceResult === 'accepted') {
//         console.log('Usuário aceitou o prompt');
//       } else {
//         console.log('Usuário cancelou o prompt');
//       }
//     });
// });
// }
