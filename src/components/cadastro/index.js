import React, { useState, Fragment } from 'react'
import { Button } from 'reactstrap'
import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'
import $ from 'jquery'
import { methodPUT } from '../../api/index'
import moment from 'moment'
import Swal from 'sweetalert2'
import md5 from 'md5'

function Cadastro() {
  const [data, setData] = useState({
    ASV001_02: '',
    ASV001_03: '',
    ASV001_04: '',
    ASV001_05: '',
    ASV001_06: null,
    ASV001_07: '',
    ASV001_08: '',
    ASV001_09: '',
    ASV001_10: '',
    ASV001_11: '',
    ASV001_12: '',
    ASV001_13: '',
    ASV001_14: '',
    ASV001_15: null,
    ASV001_16: '',
    ASV001_17: '',
  })

  function handle(e) {
    e.preventDefault()
    const newData = { ...data }
    newData[e.target.id] = e.target.value
    setData(newData)
  }

  function onBlurCep(e) {
    const { value } = e.target
    const cep = value?.replace(/[^0-9]/g, '')

    if (cep?.length !== 8) {
      return
    }

    fetch(`https://viacep.com.br/ws/${value}/json/`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        document.getElementById('street').value = data.logradouro
        document.getElementById('city').value = data.localidade
        document.getElementById('neighborhood').value = data.bairro
      })
  }

  return (
    <Fragment>
      <div className="body_cadastro">
        <div id="header">
          <a href="/">
            <img className="Restaurante" src="iconDefault.png" alt="logo"></img>
          </a>
        </div>

        <div id="container_cadastro">
          <div className="elemento">
            <div id="last_page">
              <NavLink to="/">
                <span>
                  <FontAwesomeIcon icon="arrow-left" size="2x" id="b_lp" />
                </span>
              </NavLink>
            </div>

            <div className="elemento_title">
              <h4>Informações Pessoais</h4>
              <hr />
            </div>

            <div className="elemento_container">
              <div className="cadastro_box">
                <label htmlFor="inp" className="inp">
                  <input
                    type="text"
                    id="name"
                    maxlength="60"
                    placeholder="&nbsp;"
                  ></input>
                  <span className="label">Nome Completo</span>
                  <span className="focus-bg"></span>
                </label>
              </div>
              <div className="cadastro_box">
                <label className="inp">
                  <input
                    type="text"
                    id="nick"
                    maxlength="60"
                    placeholder="&nbsp;"
                  ></input>
                  <span className="label">Apelido/Nome Fantasia</span>
                  <span className="focus-bg"></span>
                </label>
              </div>
              <div className="cadastro_box" id="radio_typeperson">
                <select>
                  <option id="type_person" value="3">
                    Pessoa Física
                  </option>
                  <option id="type_person" value="1">
                    Pessoa Jurídica
                  </option>
                </select>
              </div>
              <div className="cadastro_box">
                <label className="inp">
                  <input
                    type="number"
                    id="cpf"
                    maxlength="14"
                    placeholder="&nbsp;"
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
                  ></input>
                  <span className="label">Telefone</span>
                  <span className="focus-bg"></span>
                </label>
              </div>
              <div className="cadastro_box">
                <label className="inp">
                  <input type="email" id="email" placeholder="&nbsp;"></input>
                  <span className="label">E-mail</span>
                  <span className="focus-bg"></span>
                </label>
              </div>
              <div className="cadastro_box">
                <label className="inp">
                  <input type="date" id="date" placeholder="&nbsp;"></input>
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
                    type="number"
                    id="cep"
                    placeholder="&nbsp;"
                    value={data.cep}
                    maxlength="8"
                    onBlur={onBlurCep}
                    onChange={(e) => handle(e)}
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
                    value={data.city}
                    onChange={(e) => handle(e)}
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
                    value={data.street}
                    onChange={(e) => handle(e)}
                  ></input>
                  <span className="label">Rua</span>
                  <span className="focus-bg"></span>
                </label>
              </div>
              <div className="cadastro_box">
                <label className="inp">
                  <input type="number" id="number" placeholder="&nbsp;"></input>
                  <span className="label">Número</span>
                  <span className="focus-bg"></span>
                </label>
              </div>
              <div className="cadastro_box">
                <label className="inp">
                  <input
                    type="text"
                    id="comp"
                    maxlength="60"
                    placeholder="&nbsp;"
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
                    value={data.neighborhood}
                    onChange={(e) => handle(e)}
                  ></input>
                  <span className="label">Bairro</span>
                  <span className="focus-bg"></span>
                </label>
              </div>
            </div>

            <div className="elemento_title">
              <h4>Senha</h4>
              <hr />
            </div>

            <div className="elemento_container">
              <div className="cadastro_box">
                <label className="inp">
                  <input
                    type="password"
                    id="password"
                    placeholder="&nbsp;"
                  ></input>
                  <span className="label">Criar Senha</span>
                  <span className="focus-bg"></span>
                </label>
              </div>
              <div className="cadastro_box">
                <label className="inp">
                  <input
                    type="password"
                    id="confirm_password"
                    placeholder="&nbsp;"
                  ></input>
                  <span className="label">Confirmar Senha</span>
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

                data.ASV001_02 = $('#name').val()
                data.ASV001_03 = $('#nick').val()
                data.ASV001_04 = $('option[id="type_person"]:checked').val()
                data.ASV001_05 = $('#cpf').val()
                data.ASV001_07 = $('#cep').val()
                data.ASV001_08 = $('#street').val()
                data.ASV001_09 = $('#number').val()
                data.ASV001_10 = $('#comp').val()
                data.ASV001_12 = $('#city').val()
                data.ASV001_13 = $('#phone').val()
                data.ASV001_11 = $('#neighborhood').val()
                data.ASV001_14 = moment($('#date').val()).format('DD/MM/YYYY')
                data.ASV001_16 = $('#email').val()
                data.ASV001_17 = md5($('#password').val())
                // data.ASV001_17 = $('#password').val()

                var r = true
                let i

                if (data.ASV001_10 === '') {
                  data.ASV001_10 = null
                }

                for (i in data) {
                  if (data[i] === '') {
                    r = false
                    break
                  }
                }

                if (r === false) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    html: `<h5 id="error_msg"> Por Favor, preencha todos os campos. </h5>`,
                  })
                }

                if ($('#password').val() !== $('#confirm_password').val()) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    html: `<h5 id="error_msg"> As senhas são diferentes, por favor, tente novamente. </h5>`,
                  })
                } else {
                  methodPUT(
                    'https://api.groupsoft.com.br/gsserver/datasnap/rest/TServerMethodsApp/Cliente',
                    data
                  ).then(
                    (result) => {
                      // console.log(result[1]);
                      if (
                        result[1] == 'Já existe usuário cadastrado com esse CPF'
                      ) {
                        Swal.fire({
                          icon: 'error',
                          title: 'Oops...',
                          html: `<h5 id="error_msg"> ${result[1]} </h5>`,
                        })
                      } else if (
                        result[1] ==
                        'Já existe usuário cadastrado com esse E-mail'
                      ) {
                        Swal.fire({
                          icon: 'error',
                          title: 'Oops...',
                          html: `<h5 id="error_msg"> ${result[1]} </h5>`,
                        })
                      } else {
                        Swal.fire(
                          'Cadastro criado com sucesso',
                          '',
                          'success'
                        ).then((result) => {
                          window.location.href = '/'
                        })
                      }
                    },
                    (error) => {
                      console.log(error)
                    }
                  )
                }
              }}
            >
              Criar Conta
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Cadastro
