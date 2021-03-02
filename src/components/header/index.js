import React, { useEffect, useState } from 'react'
import './styles.css'
import Swal from 'sweetalert2'
import $ from 'jquery'
import { methodGET } from '../../api/index'
import md5 from 'md5'

function Header() {
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    $('#perfil_b').hide()
    if (localStorage.getItem('id')) {
      $('#aux_login').hide()
      $('#login').hide()
      $('#perfil_b').show()
      $('#logout').show()
    } else {
      $('#aux_login').show()
      $('#login').show()
      $('#perfil_b').hide()
      $('#logout').hide()
    }
  })

  return (
    <div className="Header">
      <div>
        <a href="/">
          <img className="Restaurante" src="iconDefault.png" alt="logo"></img>
        </a>
      </div>

      <div id="botoes_header">
        <div id="aux_login"></div>

        <div id="perfil_b">
          <button
            id="pedidos"
            className="login"
            onClick={(e) => {
              e.preventDefault()
              window.location.href = '/orders'
            }}
          >
            {' '}
            Meu Perfil{' '}
          </button>
        </div>

        <div id="login">
          <button
            className="login"
            onClick={(e) => {
              e.preventDefault()
              Swal.fire({
                title: 'Login',
                html: `
                <div className="box">
                    <div id="login_info">
                        <div class="login_card">
                            <p>E-mail </p>
                            <input id="user" type="text" class="login_text"></input>
                        </div>
                        <div class="login_card">
                        <p>Senha </p>
                            <input id="password" type="password" class="login_text"></input>
                        </div>
                    </div>
                    <div id="login_fotter">
                        <a href='/register'> <p>Criar conta</p> </a>
                    </div>
                </div>
            </div>
                `,
                preConfirm: () => {
                  if ($('#user').val() === '' || $('#password').val() == '') {
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      html: `<h5 id="error_msg"> Login ou senha inválido </h5>`,
                    })
                    return false
                  }
                  return [
                    (data.email = $('#user').val()),
                    (data.password = md5($('#password').val())),
                   
                    methodGET(
                      `https://api.groupsoft.com.br/gsserver/datasnap/rest/TServerMethodsApp/Login/${data.email}/${data.password}`
                    ).then(function (result) {
                      if (result[1] !== undefined) {
                        console.log(result)
                        Swal.fire({
                          icon: 'error',
                          title: 'Oops...',
                          html: `<h5 id="error_msg"> Login ou senha inválido </h5>`,
                        })
                      } else if (result[1] === undefined) {
                        console.log(result)
                        var id = result[0]['ASV001_01']
                        localStorage.setItem('id', id)
                        Swal.fire({
                          title: 'Login realizado com Sucesso',
                          text: '',
                          icon: 'success',
                          timer: 1000,
                          timerProgressBar: true,
                          didOpen: () => {
                            Swal.showLoading()
                          },
                        }).then((result) => {
                          window.location.href = '/'
                        })
                      }
                    }),
                  ]
                },
                allowOutsideClick: true,
                showCloseButton: true,
                confirmButtonText: `Entrar`,
              })
            }}
          >
            {' '}
            Entrar / Cadastrar{' '}
          </button>
        </div>

        <div id="logout">
          <button
            className="login"
            onClick={(e) => {
              e.preventDefault()
              localStorage.clear()
              window.location.href = '/'
            }}
          >
            {' '}
            Sair{' '}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
