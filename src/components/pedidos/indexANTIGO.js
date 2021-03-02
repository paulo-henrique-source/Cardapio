import React, { useState, Fragment, useEffect } from 'react'
import { Button } from 'reactstrap'
import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'
import $ from 'jquery'
import { methodGET, methodPOST } from '../../api/index'
import moment from 'moment'
import Swal from 'sweetalert2'
import md5 from 'md5'

function Pedidos() {
  const [clientInfo, setClientInfo] = useState([])
  const url =
    'https://api.groupsoft.com.br/gsserver/datasnap/rest/TServerMethodsApp/Cliente/'
  useEffect(() => {
    $('#second_tab').hide()
    $('#third_tab').hide()
  }, [])

  useEffect(async () => {
    if (localStorage.getItem('id')) {
      var id = localStorage.getItem('id')
    }

    const json = await methodGET(url + id)

    if (json !== undefined) {
      setClientInfo(json)
      console.log(json)
    }
  }, [])

  var type_person = ''

  if (clientInfo['ASV001_04'] === '3') {
    type_person = 'Pessoa Física'
  } else if (clientInfo['ASV001_04'] === '1') {
    type_person = 'Pessoa Jurídica'
  }

  if (clientInfo['ASV001_10'] === 'null') {
    clientInfo['ASV001_10'] = ' '
  }

  return (
    <Fragment>
      <div className="body_cadastro">
        <div id="container_perfil">
          <div id="perfil">
            <div id="last_page">
              <NavLink to="/">
                <span>
                  <FontAwesomeIcon icon="arrow-left" size="2x" id="b_lp" />
                </span>
              </NavLink>
            </div>

            <div className="elemento_title">
              <div className="elemento_title_grid">
                <h4
                  className="tab active"
                  id="tab1"
                  onClick={(e) => {
                    $('#first_tab').show()
                    $('#second_tab').hide()
                    $('#third_tab').hide()

                    $('#tab1').addClass('active')
                    $('#tab2').removeClass('active')
                    $('#tab3').removeClass('active')
                  }}
                >
                  Informações Pessoais
                </h4>
                <h4
                  className="tab"
                  id="tab2"
                  onClick={(e) => {
                    $('#first_tab').hide()
                    $('#second_tab').show()
                    $('#third_tab').hide()

                    $('#tab1').removeClass('active')
                    $('#tab2').addClass('active')
                    $('#tab3').removeClass('active')
                  }}
                >
                  Meus pedidos
                </h4>
                <h4
                  className="tab"
                  id="tab3"
                  onClick={(e) => {
                    $('#first_tab').hide()
                    $('#second_tab').hide()
                    $('#third_tab').show()

                    $('#tab1').removeClass('active')
                    $('#tab2').removeClass('active')
                    $('#tab3').addClass('active')
                  }}
                >
                  Trocar Senha
                </h4>
              </div>
              <hr id="header_space" />
            </div>

            <div id="first_tab">
              <div className="elemento_container">
                <div className="cadastro_box">
                  <label className="inp">
                    <input
                      type="text"
                      id="nick"
                      placeholder="&nbsp;"
                      value={clientInfo['ASV001_02']}
                      readOnly
                    ></input>
                    <span className="label">Nome</span>
                    <span className="focus-bg"></span>
                  </label>
                </div>
                <div className="cadastro_box">
                  <label className="inp">
                    <input
                      type="text"
                      id="nick"
                      placeholder="&nbsp;"
                      value={clientInfo['ASV001_03']}
                      readOnly
                    ></input>
                    <span className="label">Apelido/Nome Fantasia</span>
                    <span className="focus-bg"></span>
                  </label>
                </div>
                <div className="cadastro_box">
                  <label className="inp">
                    <input
                      type="text"
                      id="nick"
                      placeholder="&nbsp;"
                      value={type_person}
                      readOnly
                    ></input>
                    <span className="label">Tipo de Inscrição</span>
                    <span className="focus-bg"></span>
                  </label>
                </div>
                <div className="cadastro_box">
                  <label className="inp">
                    <input
                      type="number"
                      id="cpf"
                      placeholder="&nbsp;"
                      value={clientInfo['ASV001_05']}
                      readOnly
                    ></input>
                    <span className="label">CPF/CNPJ</span>
                    <span className="focus-bg"></span>
                  </label>
                </div>

                <div className="cadastro_box">
                  <label className="inp">
                    <input
                      type="text"
                      id="phone"
                      maxlength="12"
                      placeholder="&nbsp;"
                      value={clientInfo['ASV001_13']}
                      readOnly
                    ></input>
                    <span className="label">Telefone</span>
                    <span className="focus-bg"></span>
                  </label>
                </div>
                <div className="cadastro_box">
                  <label className="inp">
                    <input
                      type="email"
                      id="email"
                      placeholder="&nbsp;"
                      value={clientInfo['ASV001_16']}
                      readOnly
                    ></input>
                    <span className="label">E-mail</span>
                    <span className="focus-bg"></span>
                  </label>
                </div>
                <div className="cadastro_box">
                  <label className="inp">
                    <input
                      type="text"
                      id="date"
                      placeholder="&nbsp;"
                      value={moment(clientInfo['ASV001_14']).format(
                        'DD/MM/YYYY'
                      )}
                      readOnly
                    ></input>
                    <span className="label">Data de Nascimento</span>
                    <span className="focus-bg"></span>
                  </label>
                </div>
              </div>

              <div className="elemento_title">
                <h4>Endereço</h4>
                <hr />
              </div>
              <div className="elemento_container">
                <div className="cadastro_box">
                  <label className="inp">
                    <input
                      type="text"
                      id="cep"
                      placeholder="&nbsp;"
                      value={clientInfo['ASV001_07']}
                      readOnly
                    ></input>
                    <span className="label">CEP</span>
                    <span className="focus-bg"></span>
                  </label>
                </div>
                <div className="cadastro_box">
                  <label className="inp">
                    <input
                      type="text"
                      id="city"
                      placeholder="&nbsp;"
                      value={clientInfo['ASV001_12']}
                      readOnly
                    ></input>
                    <span className="label">Município</span>
                    <span className="focus-bg"></span>
                  </label>
                </div>
                <div className="cadastro_box">
                  <label className="inp">
                    <input
                      type="text"
                      id="street"
                      placeholder="&nbsp;"
                      value={clientInfo['ASV001_08']}
                      readOnly
                    ></input>
                    <span className="label">Rua</span>
                    <span className="focus-bg"></span>
                  </label>
                </div>
                <div className="cadastro_box">
                  <label className="inp">
                    <input
                      type="text"
                      id="number"
                      placeholder="&nbsp;"
                      value={clientInfo['ASV001_09']}
                      readOnly
                    ></input>
                    <span className="label">Número</span>
                    <span className="focus-bg"></span>
                  </label>
                </div>
                <div className="cadastro_box">
                  <label className="inp">
                    <input
                      type="text"
                      id="comp"
                      placeholder="&nbsp;"
                      value={clientInfo['ASV001_10']}
                      readOnly
                    ></input>
                    <span className="label">Complemento</span>
                    <span className="focus-bg"></span>
                  </label>
                </div>
                <div className="cadastro_box">
                  <label className="inp">
                    <input
                      type="text"
                      id="neighborhood"
                      placeholder="&nbsp;"
                      value={clientInfo['ASV001_11']}
                      readOnly
                    ></input>
                    <span className="label">Bairro</span>
                    <span className="focus-bg"></span>
                  </label>
                </div>
              </div>
            </div>

            <div id="second_tab">a</div>

            <div id="third_tab">
              <div className="elemento_container">
                <div className="cadastro_box">
                  <label htmlFor="inp" className="inp">
                    <input
                      type="password"
                      id="old_password"
                      placeholder="&nbsp;"
                    ></input>
                    <span className="label">Nova Senha</span>
                    <span className="focus-bg"></span>
                  </label>
                </div>
                <div className="cadastro_box">
                  <label className="inp">
                    <input
                      type="password"
                      id="new_password"
                      placeholder="&nbsp;"
                    ></input>
                    <span className="label">Cofirmar Nova Senha</span>
                    <span className="focus-bg"></span>
                  </label>
                </div>
              </div>
              <Button
                color="primary"
                size="md"
                className="b_submit"
                onClick={(e) => {
                  e.preventDefault()

                  if ($('#old_password').val() !== $('#new_password').val()) {
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      html: `<h5 id="error_msg"> As senhas são diferentes, por favor, tente novamente. </h5>`,
                    })
                  } else {
                    const nova_senha = {
                      ASV001_01: localStorage.getItem('id'),
                      ASV001_17: md5($('#new_password').val()),
                    }
                    methodPOST(
                      'https://api.groupsoft.com.br/gsserver/datasnap/rest/TServerMethodsApp/Login',
                      nova_senha
                    ).then((result) => {
                      console.log(result)
                    })

                    Swal.fire('Senha Alterada com sucesso', '', 'success').then(
                      (result) => {
                        window.location.href = '/'
                      }
                    )
                  }
                }}
              >
                Mudar Senha
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Pedidos
