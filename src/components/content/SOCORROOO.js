import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import Swal from 'sweetalert2'
import './styles.css'

function Content() {
  const [totalPrice, setTotalPrice] = useState(0)
  const [lunchName, setLunchName] = useState('')
  const [lunchSize, setLunchSize] = useState('')
  const [lunchMeet_One, setLunchMeet_One] = useState('')
  const [lunchMeet_Two, setLunchMeet_Two] = useState('')
  const [lunchAdd, setLunchAdd] = useState([])
  const [lunchPrice, setLunchPrice] = useState(0)
  const [itens, setItens] = useState([0])

  const [data, setData] = useState({
    size_price: 0,
    first_meet: '',
    second_meet: '',
    add: 0,
    observation: '',
  })

  const [dados, setDados] = useState([])

  var house = []
  var eco = []
  var chinese = []
  var light = []
  var beens = []

  var new_Total = []
  var adicionais = []
  var lunchPrice_One = []

  var gg

  var order

  function clearDados() {
    setDados([])
  }

  function clearPrice() {
    setTotalPrice(0)
  }

  function clearItens() {
    setItens([0])
  }

  function _mountOrder(data) {
    order = ''

    if (
      data == undefined ||
      data.length == 0 ||
      data.length == undefined ||
      data == ''
    ) {
      order = 'vazio'
    } else {
      var i
      for (i in data) {
        if (data[i].meat_two && data[i].meat_one !== '') {
          order +=
            '<hr />' +
            '<div class="select_container">' +
            '<div id="c_desc">' +
            '<li>' +
            data[i].title +
            '<li class="inside"> ' +
            data[i].size +
            '</li>' +
            '<li id="inside-m1"class="inside"> ' +
            data[i].meat_one +
            '</li>' +
            '<li id="inside-m2" class="inside"> ' +
            data[i].meat_two +
            '</li>' +
            '<li id="inside-add" class="inside"> ' +
            data[i].add +
            '</li>' +
            '<li class="inside-none"></li>' +
            '</li>' +
            '</div>' +
            '<div id="c_price">R$' +
            data[i].price +
            '</div>' +
            '</div>'
        }

        if (data[i].meat_one == '') {
          order +=
            '<hr />' +
            '<div class="select_container">' +
            '<div id="c_desc">' +
            '<li>' +
            data[i].title +
            '<li class="inside"> ' +
            data[i].size +
            '</li>' +
            '<li id="inside-add" class="inside"> ' +
            data[i].add +
            '</li>' +
            '<li class="inside-none"></li>' +
            '</li>' +
            '</div>' +
            '<div id="c_price">R$' +
            data[i].price +
            '</div>' +
            '</div>'
        }

        if (data[i].meat_two == '' && data[i].meat_one !== '') {
          order +=
            '<hr />' +
            '<div class="select_container">' +
            '<div id="c_desc">' +
            '<li>' +
            data[i].title +
            '<li class="inside"> ' +
            data[i].size +
            '</li>' +
            '<li id="inside-m1"class="inside"> ' +
            data[i].meat_one +
            '</li>' +
            '<li id="inside-add" class="inside"> ' +
            data[i].add +
            '</li>' +
            '<li class="inside-none"></li>' +
            '</li>' +
            '</div>' +
            '<div id="c_price">R$' +
            data[i].price +
            '</div>' +
            '</div>'
        }
      }
    }
  }

  useEffect(() => {
    _mountOrder(dados)
    console.log(dados)

    if (totalPrice !== 0) {
      var previus = $('#aloha').html().replace('R$ ', '')

      new_Total.push(parseFloat(previus))
    }
  })

  function myFunc(total, num) {
    return total + num
  }

  return (
    <div className="Content">
      <div className="title">Marmitas</div>

      <section className="card_container">
        <div
          className="container"
          onClick={(e) => {
            e.preventDefault()

            Swal.fire({
              title:
                '<div id="modal_title"><h4>Detalhes</h4> <h5 id="lunch"> Marmita Moda da Casa </h5> </div>',
              html: `
                        
                        
                        <section class="Swal-Container">
                            <div class="jorginho" id="msg_size">Selecione o seu TAMANHO. </div>
                            <div class="jorginho" id="obg">OBRIGATORIO</div>
                            </section>

                            <p class = "op_msg">Escolha 1 opção</p>
                            <hr></hr>

                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Pequena</p>
                                <p id="c_price">R$ 13,00</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Pequena" id="size" name="size" type="radio" value="13.00"/>
                            </div>
                            </div>
                            <hr></hr>
                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Média</p>
                                <p id="c_price">R$ 15,00</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Média" id="size" name="size" type="radio" value="15.00"/>
                            </div>
                            </div>
                            <hr></hr>

                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Grande</p>
                                <p id="c_price">R$ 17,00</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Grande" id="size" name="size" type="radio" value="17.00"/>
                            </div>
                            </div>
                            <hr></hr>

                            <section class="Swal-Container">
                            <div class="jorginho" id="msg_size">Opções de Carne </div>
                            <div class="jorginho" id="obg">OBRIGATORIO</div>
                            </section>
                            
                            <p class = "op_msg" >Escolha a PRIMEIRA opção</p>
                            <hr></hr>

                            <div class = "select_container"> 
                                <div class ="c_info">
                                    <p id="c_desc">Bife Acebolado</p>
                                </div>
                                <div class ="c_button"> 
                                  <input type="radio" name="option-one" value="Bife Acebolado"/>
                                </div>
                            </div>
                            <hr></hr>

                            <div class = "select_container"> 
                                <div class ="c_info">
                                    <p id="c_desc">Bife à Milanesa</p>
                                </div>
                                <div class ="c_button"> 
                                  <input type="radio" name="option-one" value="Bife à Milanesa"/>
                                </div>
                            </div>
                            <hr></hr>

                            <div class = "select_container"> 
                                <div class ="c_info">
                                    <p id="c_desc">Bife Parmegiana</p>
                                </div>
                                <div class ="c_button"> 
                                  <input type="radio" name="option-one" value="Bife Parmegiana"/>
                                </div>
                            </div>
                            <hr></hr>

                            <div class = "select_container"> 
                                <div class ="c_info">
                                    <p id="c_desc">Filé de Frago Grelhado</p>
                                </div>
                                <div class ="c_button"> 
                                  <input type="radio" name="option-one" value="File de Frango Grelhado"/>
                                </div>
                            </div>
                            <hr></hr>

                            <div class = "select_container"> 
                                <div class ="c_info">
                                    <p id="c_desc">Filé de Frago à Milanesa</p>
                                </div>
                                <div class ="c_button"> 
                                  <input type="radio" name="option-one" value="File de Frango à Milanesa"/>
                                </div>
                            </div>
                            <hr></hr>

                            <div class = "select_container"> 
                                <div class ="c_info">
                                    <p id="c_desc">Filé de Frago Parmegiana</p>
                                </div>
                                <div class ="c_button"> 
                                  <input type="radio" name="option-one" value="File de Frango Parmegiana"/>
                                </div>
                            </div>
                            <hr></hr>

                                <div class = "select_container"> 
                                <div class ="c_info">
                                    <p id="c_desc">Frango à Passarinho</p>
                                </div>
                                <div class ="c_button"> 
                                <input type="radio" name="option-one" value="Frango à Passarinho"/>
                                </div>
                            </div>
                            <hr></hr>
                            
                                <div class = "select_container"> 
                                <div class ="c_info">
                                    <p id="c_desc">Porquinho Alho e Óleo</p>
                                </div>
                                <div class ="c_button"> 
                                <input type="radio" name="option-one" value="Porquinho Alho e Óleo"/>
                                </div>
                            </div>
                            <hr></hr>

                                <div class = "select_container"> 
                                <div class ="c_info">
                                    <p id="c_desc">Linguiça</p>
                                </div>
                                <div class ="c_button"> 
                                <input type="radio" name="option-one" value="Linguiça"/>
                                </div>
                            </div>
                            <hr></hr>

                                <div class = "select_container"> 
                                <div class ="c_info">
                                    <p id="c_desc">Carne Moída</p>
                                </div>
                                <div class ="c_button"> 
                                <input type="radio" name="option-one" value="Carne Moída"/>
                                </div>
                            </div>
                            <hr></hr>

                                <div class = "select_container"> 
                                <div class ="c_info">
                                    <p id="c_desc">Panqueca</p>
                                </div>
                                <div class ="c_button"> 
                                <input type="radio" name="option-one" value="Panqueca"/>
                                </div>
                            </div>
                            <hr></hr>


                            <section class="Swal-Container">
                            <div class="jorginho" id="msg_size">Opções de Carne </div>
                            <div class="jorginho" id="obg">OBRIGATORIO</div>
                            </section>

                            <p class = "op_msg">Escolha a SEGUNDA opção</p>
                            <hr></hr>

                            <div class = "select_container"> 
                                <div class ="c_info">
                                    <p id="c_desc">Bife Acebolado</p>
                                </div>
                                <div class ="c_button"> 
                                  <input type="radio" name="option-two" value="Bife Acebolado"/>
                                </div>
                            </div>
                            <hr></hr>

                            <div class = "select_container"> 
                                <div class ="c_info">
                                    <p id="c_desc">Bife à Milanesa</p>
                                </div>
                                <div class ="c_button"> 
                                  <input type="radio" name="option-two" value="Bife à Milanesa"/>
                                </div>
                            </div>
                            <hr></hr>

                            <div class = "select_container"> 
                                <div class ="c_info">
                                    <p id="c_desc">Bife Parmegiana</p>
                                </div>
                                <div class ="c_button"> 
                                  <input type="radio" name="option-two" value="Bife Parmegiana"/>
                                </div>
                            </div>
                            <hr></hr>

                            <div class = "select_container"> 
                                <div class ="c_info">
                                    <p id="c_desc">Filé de Frago Grelhado</p>
                                </div>
                                <div class ="c_button"> 
                                  <input type="radio" name="option-two" value="File de Frango Grelhado"/>
                                </div>
                            </div>
                            <hr></hr>

                            <div class = "select_container"> 
                                <div class ="c_info">
                                    <p id="c_desc">Filé de Frago à Milanesa</p>
                                </div>
                                <div class ="c_button"> 
                                  <input type="radio" name="option-two" value="File de Frango à Milanesa"/>
                                </div>
                            </div>
                            <hr></hr>

                            <div class = "select_container"> 
                                <div class ="c_info">
                                    <p id="c_desc">Filé de Frago Parmegiana</p>
                                </div>
                                <div class ="c_button"> 
                                  <input type="radio" name="option-two" value="File de Frango Parmegiana"/>
                                </div>
                            </div>
                            <hr></hr>

                                <div class = "select_container"> 
                                <div class ="c_info">
                                    <p id="c_desc">Frango à Passarinho</p>
                                </div>
                                <div class ="c_button"> 
                                <input type="radio" name="option-two" value="Frango à Passarinho"/>
                                </div>
                            </div>
                            <hr></hr>
                            
                                <div class = "select_container"> 
                                <div class ="c_info">
                                    <p id="c_desc">Porquinho Alho e Óleo</p>
                                </div>
                                <div class ="c_button"> 
                                <input type="radio" name="option-two" value="Porquinho Alho e Óleo"/>
                                </div>
                            </div>
                            <hr></hr>

                                <div class = "select_container"> 
                                <div class ="c_info">
                                    <p id="c_desc">Linguiça</p>
                                </div>
                                <div class ="c_button"> 
                                <input type="radio" name="option-two" value="Linguiça"/>
                                </div>
                            </div>
                            <hr></hr>

                                <div class = "select_container"> 
                                <div class ="c_info">
                                    <p id="c_desc">Carne Moída</p>
                                </div>
                                <div class ="c_button"> 
                                <input type="radio" name="option-two" value="Carne Moída"/>
                                </div>
                            </div>
                            <hr></hr>

                                <div class = "select_container"> 
                                <div class ="c_info">
                                    <p id="c_desc">Panqueca</p>
                                </div>
                                <div class ="c_button"> 
                                <input type="radio" name="option-two" value="Panqueca"/>
                                </div>
                            </div>
                            <hr></hr>


                            <section class="Swal-Container">
                            <div class="jorginho" id="msg_size">Adicionais</div>
                            </section>

                            <p class = "op_msg">Selecione até 6 opções</p>
                            <hr></hr>

                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Panqueca</p>
                                <p id="c_price">R$ 4,00</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Panqueca" name="add" type="checkbox" value="4.00"/>
                            </div>
                            </div>
                            <hr></hr>

                            
                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Banana</p>
                                <p id="c_price">R$ 1,50</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Banana" name="add" type="checkbox" value="1.50"/>
                            </div>
                            </div>
                            <hr></hr>


                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Ovo</p>
                                <p id="c_price">R$ 1,50</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Ovo" name="add" type="checkbox" value="1.50"/>
                            </div>
                            </div>
                            <hr></hr>

                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Porção 100g</p>
                                <p id="c_price">R$ 6,00</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Porção 100g" name="add" type="checkbox" value="6.00"/>
                            </div>
                            </div>
                            <hr></hr>

                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Porção (Meia) 400g</p>
                                <p id="c_price">R$ 20,00</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Porção (Meia) 400g" name="add" type="checkbox" value="20.00"/>
                            </div>
                            </div>
                            <hr></hr>

                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Porção (Inteira) 800g</p>
                                <p id="c_price">R$ 40,00</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Porção (Inteira) 800g" name="add" type="checkbox" value="40.00"/>
                            </div>
                            </div>
                            <hr></hr>
                            `,
              allowOutsideClick: true,
              showCloseButton: true,
              confirmButtonText: `Adicionar ao Carrinho`,

              preConfirm: () => {
                if (
                  $('input[name="size"]:checked').val() == undefined ||
                  $('input[name="option-one"]:checked').val() == undefined ||
                  $('input[name="option-two"]:checked').val() == undefined
                ) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    html: `<h5 id="error_msg"> Por Favor selecione todos os campos OBRIGATÓRIOS. </h5>`,
                  })
                  return false
                }

                adicionais = ['Sem Adicional']
                setLunchAdd(adicionais)
                $('input:checkbox[name=add]:checked').each(function () {
                  var chacked = parseFloat($(this).val())
                  house.push(chacked)
                  const index = adicionais.indexOf('Sem Adicional')
                  if (index > -1) {
                    adicionais.splice(index, 1)
                  }
                  adicionais.push($(this)[0].attributes[0].textContent)
                  setLunchAdd(adicionais)
                })

                house.push(parseFloat($('input[name="size"]:checked').val()))

                return [
                  (data.add = house.reduce((a, b) => a + b, 0)),
                  (data.size_price = $('input[name="size"]:checked').val()),
                  (data.first_meet = $(
                    'input[name="option-one"]:checked'
                  ).val()),
                  (data.second_meet = $(
                    'input[name="option-two"]:checked'
                  ).val()),

                  setLunchName($('#lunch').html()),
                  setLunchSize(
                    $('input[name="size"]:checked')[0].attributes[0].textContent
                  ),
                  setLunchMeet_One($('input[name="option-one"]:checked').val()),
                  setLunchMeet_Two($('input[name="option-two"]:checked').val()),
                  setLunchPrice(house.reduce((a, b) => a + b, 0)),

                  dados.push({
                    title: $('#lunch').html(),
                    size: $('input[name="size"]:checked')[0].attributes[0]
                      .textContent,
                    meat_one: $('input[name="option-one"]:checked').val(),
                    meat_two: $('input[name="option-two"]:checked').val(),
                    add: adicionais,
                    price: house.reduce((a, b) => a + b, 0),
                  }),
                ]
              },
            }).then(function (result) {
              if (result.isConfirmed == true) {
                itens.push(1)

                if (totalPrice == 0) {
                  new_Total.push(parseFloat(result.value[0]))
                  setTotalPrice(parseFloat(result.value[0]))
                } else {
                  new_Total.push(parseFloat(result.value[0]))
                  setTotalPrice(new_Total.reduce(myFunc))
                }
              }
            })
          }}
        >
          <div className="info">
            <div className="info_sup">
              <div id="nameId" className="name">
                Marmita Moda da Casa
              </div>
              <div className="desc">
                Arroz, Feijão, Massa do dia, refogado, fritas, farofa, 2 carnes
                a escolha e salada.
              </div>
            </div>
            <div className="info_inf">
              <fotter className="price">A partir de R$ 13,00</fotter>
            </div>
          </div>
          <div className="image">
            <img src="moda_casa.jpg"></img>
          </div>
        </div>

        <div
          className="container"
          onClick={(e) => {
            e.preventDefault()

            Swal.fire({
              title:
                '<div id="modal_title"><h4>Detalhes</h4> <h5 id="lunch"> Marmita Econômica </h5> </div>',
              html: `
                        
                        
                        <section class="Swal-Container">
                            <div class="jorginho" id="msg_size">Selecione o seu TAMANHO. </div>
                            <div class="jorginho" id="obg">OBRIGATORIO</div>
                            </section>

                            <p class = "op_msg">Escolha 1 opção</p>
                            <hr></hr>

                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Pequena</p>
                                <p id="c_price">R$ 11,00</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Pequena" id="size" name="size" type="radio" value="11.00"/>
                            </div>
                            </div>
                            <hr></hr>
                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Média</p>
                                <p id="c_price">R$ 13,00</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Média" id="size" name="size" type="radio" value="13.00"/>
                            </div>
                            </div>
                            <hr></hr>

                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Grande</p>
                                <p id="c_price">R$ 15,00</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Grande" id="size" name="size" type="radio" value="15.00"/>
                            </div>
                            </div>
                            <hr></hr>

                            <section class="Swal-Container">
                            <div class="jorginho" id="msg_size">Opções de Carne </div>
                            <div class="jorginho" id="obg">OBRIGATORIO</div>
                            </section>
                            
                            <p class = "op_msg" >Escolha a PRIMEIRA opção</p>
                            <hr></hr>

                            <div class = "select_container"> 
                                <div class ="c_info">
                                    <p id="c_desc">Bife Acebolado</p>
                                </div>
                                <div class ="c_button"> 
                                  <input type="radio" name="option-one" value="Bife Acebolado"/>
                                </div>
                            </div>
                            <hr></hr>

                            <div class = "select_container"> 
                                <div class ="c_info">
                                    <p id="c_desc">Bife à Milanesa</p>
                                </div>
                                <div class ="c_button"> 
                                  <input type="radio" name="option-one" value="Bife à Milanesa"/>
                                </div>
                            </div>
                            <hr></hr>

                            <div class = "select_container"> 
                                <div class ="c_info">
                                    <p id="c_desc">Bife Parmegiana</p>
                                </div>
                                <div class ="c_button"> 
                                  <input type="radio" name="option-one" value="Bife Parmegiana"/>
                                </div>
                            </div>
                            <hr></hr>

                            <div class = "select_container"> 
                                <div class ="c_info">
                                    <p id="c_desc">Filé de Frago Grelhado</p>
                                </div>
                                <div class ="c_button"> 
                                  <input type="radio" name="option-one" value="File de Frango Grelhado"/>
                                </div>
                            </div>
                            <hr></hr>

                            <div class = "select_container"> 
                                <div class ="c_info">
                                    <p id="c_desc">Filé de Frago à Milanesa</p>
                                </div>
                                <div class ="c_button"> 
                                  <input type="radio" name="option-one" value="File de Frango à Milanesa"/>
                                </div>
                            </div>
                            <hr></hr>

                            <div class = "select_container"> 
                                <div class ="c_info">
                                    <p id="c_desc">Filé de Frago Parmegiana</p>
                                </div>
                                <div class ="c_button"> 
                                  <input type="radio" name="option-one" value="File de Frango Parmegiana"/>
                                </div>
                            </div>
                            <hr></hr>

                                <div class = "select_container"> 
                                <div class ="c_info">
                                    <p id="c_desc">Frango à Passarinho</p>
                                </div>
                                <div class ="c_button"> 
                                <input type="radio" name="option-one" value="Frango à Passarinho"/>
                                </div>
                            </div>
                            <hr></hr>
                            
                                <div class = "select_container"> 
                                <div class ="c_info">
                                    <p id="c_desc">Porquinho Alho e Óleo</p>
                                </div>
                                <div class ="c_button"> 
                                <input type="radio" name="option-one" value="Porquinho Alho e Óleo"/>
                                </div>
                            </div>
                            <hr></hr>

                                <div class = "select_container"> 
                                <div class ="c_info">
                                    <p id="c_desc">Linguiça</p>
                                </div>
                                <div class ="c_button"> 
                                <input type="radio" name="option-one" value="Linguiça"/>
                                </div>
                            </div>
                            <hr></hr>

                                <div class = "select_container"> 
                                <div class ="c_info">
                                    <p id="c_desc">Carne Moída</p>
                                </div>
                                <div class ="c_button"> 
                                <input type="radio" name="option-one" value="Carne Moída"/>
                                </div>
                            </div>
                            <hr></hr>

                                <div class = "select_container"> 
                                <div class ="c_info">
                                    <p id="c_desc">Panqueca</p>
                                </div>
                                <div class ="c_button"> 
                                <input type="radio" name="option-one" value="Panqueca"/>
                                </div>
                            </div>
                            <hr></hr>


                            <section class="Swal-Container">
                            <div class="jorginho" id="msg_size">Adicionais</div>
                            </section>

                            <p class = "op_msg">Selecione até 6 opções</p>
                            <hr></hr>

                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Panqueca</p>
                                <p id="c_price">R$ 4,00</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Panqueca" name="add" type="checkbox" value="4.00"/>
                            </div>
                            </div>
                            <hr></hr>

                            
                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Banana</p>
                                <p id="c_price">R$ 1,50</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Banana" name="add" type="checkbox" value="1.50"/>
                            </div>
                            </div>
                            <hr></hr>


                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Ovo</p>
                                <p id="c_price">R$ 1,50</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Ovo" name="add" type="checkbox" value="1.50"/>
                            </div>
                            </div>
                            <hr></hr>

                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Porção 100g</p>
                                <p id="c_price">R$ 6,00</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Porção 100g" name="add" type="checkbox" value="6.00"/>
                            </div>
                            </div>
                            <hr></hr>

                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Porção (Meia) 400g</p>
                                <p id="c_price">R$ 20,00</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Porção (Meia) 400g" name="add" type="checkbox" value="20.00"/>
                            </div>
                            </div>
                            <hr></hr>

                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Porção (Inteira) 800g</p>
                                <p id="c_price">R$ 40,00</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Porção (Inteira) 800g" name="add" type="checkbox" value="40.00"/>
                            </div>
                            </div>
                            <hr></hr>

                            `,
              allowOutsideClick: true,
              showCloseButton: true,
              confirmButtonText: `Adicionar ao Carrinho`,

              preConfirm: () => {
                if (
                  $('input[name="size"]:checked').val() == undefined ||
                  $('input[name="option-one"]:checked').val() == undefined
                ) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    html: `<h5 id="error_msg"> Por Favor selecione todos os campos OBRIGATÓRIOS. </h5>`,
                  })
                  return false
                }
                adicionais = ['Sem Adicional']
                setLunchAdd(adicionais)
                $('input:checkbox[name=add]:checked').each(function () {
                  var chacked = parseFloat($(this).val())
                  house.push(chacked)
                  const index = adicionais.indexOf('Sem Adicional')
                  if (index > -1) {
                    adicionais.splice(index, 1)
                  }
                  adicionais.push($(this)[0].attributes[0].textContent)
                  setLunchAdd(adicionais)
                })
                house.push(parseFloat($('input[name="size"]:checked').val()))

                return [
                  (data.add = house.reduce((a, b) => a + b, 0)),
                  (data.size_price = $('input[name="size"]:checked').val()),
                  (data.first_meet = $(
                    'input[name="option-one"]:checked'
                  ).val()),
                  (data.observation = $('#message').val()),

                  setLunchPrice(house.reduce((a, b) => a + b, 0)),
                  setLunchName($('#lunch').html()),
                  setLunchSize(
                    $('input[name="size"]:checked')[0].attributes[0].textContent
                  ),
                  setLunchMeet_One($('input[name="option-one"]:checked').val()),

                  dados.push({
                    title: $('#lunch').html(),
                    size: $('input[name="size"]:checked')[0].attributes[0]
                      .textContent,
                    meat_one: $('input[name="option-one"]:checked').val(),
                    meat_two: '',
                    add: adicionais,
                    price: house.reduce((a, b) => a + b, 0),
                  }),
                ]
              },
            }).then(function (result) {
              if (result.isConfirmed == true) {
                itens.push(1)

                if (totalPrice == 0) {
                  new_Total.push(parseFloat(result.value[0]))
                  setTotalPrice(parseFloat(result.value[0]))
                } else {
                  new_Total.push(parseFloat(result.value[0]))
                  setTotalPrice(new_Total.reduce(myFunc))
                }
              }
            })
          }}
        >
          <div className="info">
            <div className="info_sup">
              <div id="nameId" className="name">
                Marmita Econômica
              </div>
              <div className="desc">
                Arroz, Feijão, refogado, ovo, fritas, farofa, 1 carne a escolha
                e salada.
              </div>
            </div>
            <div className="info_inf">
              <fotter className="price">A partir de R$ 11,00</fotter>
            </div>
          </div>
          <div className="image">
            <img src="economica.jpg"></img>
          </div>
        </div>

        <div
          className="container"
          onClick={(e) => {
            e.preventDefault()

            Swal.fire({
              title:
                '<div id="modal_title"><h4>Detalhes</h4> <h5 id="lunch"> Marmita Chinesa </h5> </div>',
              html: `
                        
                        
                        <section class="Swal-Container">
                            <div class="jorginho" id="msg_size">Selecione o seu TAMANHO. </div>
                            <div class="jorginho" id="obg">OBRIGATORIO</div>
                            </section>

                            <p class = "op_msg">Escolha 1 opção</p>
                            <hr></hr>

                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Pequena</p>
                                <p id="c_price">R$ 13,00</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Pequena" id="size" name="size" type="radio" value="13.00"/>
                            </div>
                            </div>
                            <hr></hr>
                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Média</p>
                                <p id="c_price">R$ 16,00</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Média" id="size" name="size" type="radio" value="16.00"/>
                            </div>
                            </div>
                            <hr></hr>

                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Grande</p>
                                <p id="c_price">R$ 20,00</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Grande" id="size" name="size" type="radio" value="20.00"/>
                            </div>
                            </div>
                            <hr></hr>


                            <section class="Swal-Container">
                            <div class="jorginho" id="msg_size">Adicionais</div>
                            </section>

                            <p class = "op_msg">Selecione até 6 opções</p>
                            <hr></hr>

                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Panqueca</p>
                                <p id="c_price">R$ 4,00</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Panqueca" name="add" type="checkbox" value="4.00"/>
                            </div>
                            </div>
                            <hr></hr>

                            
                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Banana</p>
                                <p id="c_price">R$ 1,50</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Banana" name="add" type="checkbox" value="1.50"/>
                            </div>
                            </div>
                            <hr></hr>


                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Ovo</p>
                                <p id="c_price">R$ 1,50</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Ovo" name="add" type="checkbox" value="1.50"/>
                            </div>
                            </div>
                            <hr></hr>

                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Porção 100g</p>
                                <p id="c_price">R$ 6,00</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Porção 100g" name="add" type="checkbox" value="6.00"/>
                            </div>
                            </div>
                            <hr></hr>

                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Porção (Meia) 400g</p>
                                <p id="c_price">R$ 20,00</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Porção (Meia) 400g" name="add" type="checkbox" value="20.00"/>
                            </div>
                            </div>
                            <hr></hr>

                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Porção (Inteira) 800g</p>
                                <p id="c_price">R$ 40,00</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Porção (Inteira) 800g" name="add" type="checkbox" value="40.00"/>
                            </div>
                            </div>
                            <hr></hr>

                            `,
              allowOutsideClick: true,
              showCloseButton: true,
              confirmButtonText: `Adicionar ao Carrinho`,

              preConfirm: () => {
                if ($('input[name="size"]:checked').val() == undefined) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    html: `<h5 id="error_msg"> Por Favor selecione todos os campos OBRIGATÓRIOS. </h5>`,
                  })
                  return false
                }
                adicionais = ['Sem Adicional']
                setLunchAdd(adicionais)
                $('input:checkbox[name=add]:checked').each(function () {
                  var chacked = parseFloat($(this).val())
                  house.push(chacked)
                  const index = adicionais.indexOf('Sem Adicional')
                  if (index > -1) {
                    adicionais.splice(index, 1)
                  }
                  adicionais.push($(this)[0].attributes[0].textContent)
                  setLunchAdd(adicionais)
                })
                house.push(parseFloat($('input[name="size"]:checked').val()))

                return [
                  (data.add = house.reduce((a, b) => a + b, 0)),
                  (data.size_price = $('input[name="size"]:checked').val()),
                  (data.observation = $('#message').val()),

                  setLunchPrice(house.reduce((a, b) => a + b, 0)),
                  setLunchName($('#lunch').html()),
                  setLunchSize(
                    $('input[name="size"]:checked')[0].attributes[0].textContent
                  ),

                  dados.push({
                    title: $('#lunch').html(),
                    size: $('input[name="size"]:checked')[0].attributes[0]
                      .textContent,
                    meat_one: '',
                    meat_two: '',
                    add: adicionais,
                    price: house.reduce((a, b) => a + b, 0),
                  }),
                ]
              },
            }).then(function (result) {
              if (result.isConfirmed == true) {
                itens.push(1)

                if (totalPrice == 0) {
                  new_Total.push(parseFloat(result.value[0]))
                  setTotalPrice(parseFloat(result.value[0]))
                } else {
                  new_Total.push(parseFloat(result.value[0]))
                  setTotalPrice(new_Total.reduce(myFunc))
                }
              }
            })
          }}
        >
          <div className="info">
            <div className="info_sup">
              <div className="name">Marmita Chinesa</div>
              <div className="desc">
                Arroz Chop Suey, Porquinho alho e óleo, Frango Xadrez e Salada
                Chinesa (repolho).
              </div>
            </div>
            <div className="info_inf">
              <fotter className="price">A partir de R$ 13,00</fotter>
            </div>
          </div>
          <div className="image">
            <img src="chinesa.jpg"></img>
          </div>
        </div>

        <div
          className="container"
          onClick={(e) => {
            e.preventDefault()

            Swal.fire({
              title:
                '<div id="modal_title"><h4>Detalhes</h4> <h5 id="lunch"> Marmita Light </h5> </div>',
              html: `
                        
                        
                        <section class="Swal-Container">
                            <div class="jorginho" id="msg_size">Selecione o seu TAMANHO. </div>
                            <div class="jorginho" id="obg">OBRIGATORIO</div>
                            </section>

                            <p class = "op_msg">Escolha 1 opção</p>
                            <hr></hr>

                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Pequena</p>
                                <p id="c_price">R$ 11,00</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Pequena" id="size" name="size" type="radio" value="11.00"/>
                            </div>
                            </div>
                            <hr></hr>
                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Média</p>
                                <p id="c_price">R$ 13,00</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Média" id="size" name="size" type="radio" value="13.00"/>
                            </div>
                            </div>
                            <hr></hr>

                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Grande</p>
                                <p id="c_price">R$ 15,00</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Grande" id="size" name="size" type="radio" value="15.00"/>
                            </div>
                            </div>
                            <hr></hr>


                            <section class="Swal-Container">
                            <div class="jorginho" id="msg_size">Adicionais</div>
                            </section>

                            <p class = "op_msg">Selecione até 6 opções</p>
                            <hr></hr>

                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Panqueca</p>
                                <p id="c_price">R$ 4,00</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Panqueca" name="add" type="checkbox" value="4.00"/>
                            </div>
                            </div>
                            <hr></hr>

                            
                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Banana</p>
                                <p id="c_price">R$ 1,50</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Banana" name="add" type="checkbox" value="1.50"/>
                            </div>
                            </div>
                            <hr></hr>


                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Ovo</p>
                                <p id="c_price">R$ 1,50</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Ovo" name="add" type="checkbox" value="1.50"/>
                            </div>
                            </div>
                            <hr></hr>

                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Porção 100g</p>
                                <p id="c_price">R$ 6,00</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Porção 100g" name="add" type="checkbox" value="6.00"/>
                            </div>
                            </div>
                            <hr></hr>

                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Porção (Meia) 400g</p>
                                <p id="c_price">R$ 20,00</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Porção (Meia) 400g" name="add" type="checkbox" value="20.00"/>
                            </div>
                            </div>
                            <hr></hr>

                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Porção (Inteira) 800g</p>
                                <p id="c_price">R$ 40,00</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Porção (Inteira) 800g" name="add" type="checkbox" value="40.00"/>
                            </div>
                            </div>
                            <hr></hr>


                            `,
              allowOutsideClick: true,
              showCloseButton: true,
              confirmButtonText: `Adicionar ao Carrinho`,

              preConfirm: () => {
                if ($('input[name="size"]:checked').val() == undefined) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    html: `<h5 id="error_msg"> Por Favor selecione todos os campos OBRIGATÓRIOS. </h5>`,
                  })
                  return false
                }
                adicionais = ['Sem Adicional']
                setLunchAdd(adicionais)
                $('input:checkbox[name=add]:checked').each(function () {
                  var chacked = parseFloat($(this).val())
                  house.push(chacked)
                  const index = adicionais.indexOf('Sem Adicional')
                  if (index > -1) {
                    adicionais.splice(index, 1)
                  }
                  adicionais.push($(this)[0].attributes[0].textContent)
                  setLunchAdd(adicionais)
                })
                house.push(parseFloat($('input[name="size"]:checked').val()))

                return [
                  (data.add = house.reduce((a, b) => a + b, 0)),
                  (data.size_price = $('input[name="size"]:checked').val()),
                  (data.observation = $('#message').val()),

                  setLunchPrice(house.reduce((a, b) => a + b, 0)),
                  setLunchName($('#lunch').html()),
                  setLunchSize(
                    $('input[name="size"]:checked')[0].attributes[0].textContent
                  ),

                  dados.push({
                    title: $('#lunch').html(),
                    size: $('input[name="size"]:checked')[0].attributes[0]
                      .textContent,
                    meat_one: '',
                    meat_two: '',
                    add: adicionais,
                    price: house.reduce((a, b) => a + b, 0),
                  }),
                ]
              },
            }).then(function (result) {
              if (result.isConfirmed == true) {
                itens.push(1)

                if (totalPrice == 0) {
                  new_Total.push(parseFloat(result.value[0]))
                  setTotalPrice(parseFloat(result.value[0]))
                } else {
                  new_Total.push(parseFloat(result.value[0]))
                  setTotalPrice(new_Total.reduce(myFunc))
                }
              }
            })
          }}
        >
          <div className="info">
            <div className="info_sup">
              <div className="name">Marmita Light</div>
              <div className="desc">
                Arroz Integral, Feijão, Legumes, Filé de Frango Grelhado e
                Salada.
              </div>
            </div>
            <div className="info_inf">
              <fotter className="price">A partir de R$ 11,00</fotter>
            </div>
          </div>
          <div className="image">
            <img src="light.jpg"></img>
          </div>
        </div>
      </section>

      <div className="title">Feijoada (Quartas-feiras e Sábados)</div>

      <section className="card_container" id="container_feijoada">
        <div
          className="container"
          onClick={(e) => {
            e.preventDefault()

            Swal.fire({
              title:
                '<div id="modal_title"><h4>Detalhes</h4> <h5 id="lunch"> Feijoada </h5> </div>',
              html: `
                        
                        
                        <section class="Swal-Container">
                            <div class="jorginho" id="msg_size">Selecione o seu TAMANHO. </div>
                            <div class="jorginho" id="obg">OBRIGATORIO</div>
                            </section>

                            <p class = "op_msg">Escolha 1 opção</p>
                            <hr></hr>

                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Pequena</p>
                                <p id="c_price">R$ 13,00</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Pequena" id="size" name="size" type="radio" value="13.00"/>
                            </div>
                            </div>
                            <hr></hr>
                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Média</p>
                                <p id="c_price">R$ 16,00</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Média" id="size" name="size" type="radio" value="16.00"/>
                            </div>
                            </div>
                            <hr></hr>

                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Grande</p>
                                <p id="c_price">R$ 20,00</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Grande" id="size" name="size" type="radio" value="20.00"/>
                            </div>
                            </div>
                            <hr></hr>


                            <section class="Swal-Container">
                            <div class="jorginho" id="msg_size">Adicionais</div>
                            </section>

                            <p class = "op_msg">Selecione até 6 opções</p>
                            <hr></hr>

                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Panqueca</p>
                                <p id="c_price">R$ 4,00</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Panqueca" name="add" type="checkbox" value="4.00"/>
                            </div>
                            </div>
                            <hr></hr>

                            
                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Banana</p>
                                <p id="c_price">R$ 1,50</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Banana" name="add" type="checkbox" value="1.50"/>
                            </div>
                            </div>
                            <hr></hr>


                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Ovo</p>
                                <p id="c_price">R$ 1,50</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Ovo" name="add" type="checkbox" value="1.50"/>
                            </div>
                            </div>
                            <hr></hr>

                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Porção 100g</p>
                                <p id="c_price">R$ 6,00</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Porção 100g" name="add" type="checkbox" value="6.00"/>
                            </div>
                            </div>
                            <hr></hr>

                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Porção (Meia) 400g</p>
                                <p id="c_price">R$ 20,00</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Porção (Meia) 400g" name="add" type="checkbox" value="20.00"/>
                            </div>
                            </div>
                            <hr></hr>

                            <div class = "select_container"> 
                            <div class ="c_info"> 
                                <p id="c_desc">Porção (Inteira) 800g</p>
                                <p id="c_price">R$ 40,00</p>
                            </div>
                            <div class ="c_button"> 
                                <input placeholder="Porção (Inteira) 800g" name="add" type="checkbox" value="40.00"/>
                            </div>
                            </div>
                            <hr></hr>


                            `,
              allowOutsideClick: true,
              showCloseButton: true,
              confirmButtonText: `Adicionar ao Carrinho`,

              preConfirm: () => {
                if ($('input[name="size"]:checked').val() == undefined) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    html: `<h5 id="error_msg"> Por Favor selecione todos os campos OBRIGATÓRIOS. </h5>`,
                  })
                  return false
                }
                adicionais = ['Sem Adicional']
                setLunchAdd(adicionais)
                $('input:checkbox[name=add]:checked').each(function () {
                  var chacked = parseFloat($(this).val())
                  house.push(chacked)
                  const index = adicionais.indexOf('Sem Adicional')
                  if (index > -1) {
                    adicionais.splice(index, 1)
                  }
                  adicionais.push($(this)[0].attributes[0].textContent)
                  setLunchAdd(adicionais)
                })
                house.push(parseFloat($('input[name="size"]:checked').val()))

                return [
                  (data.add = house.reduce((a, b) => a + b, 0)),
                  (data.size_price = $('input[name="size"]:checked').val()),
                  (data.observation = $('#message').val()),

                  setLunchPrice(house.reduce((a, b) => a + b, 0)),
                  setLunchName($('#lunch').html()),
                  setLunchSize(
                    $('input[name="size"]:checked')[0].attributes[0].textContent
                  ),

                  dados.push({
                    title: $('#lunch').html(),
                    size: $('input[name="size"]:checked')[0].attributes[0]
                      .textContent,
                    meat_one: '',
                    meat_two: '',
                    add: adicionais,
                    price: house.reduce((a, b) => a + b, 0),
                  }),
                ]
              },
            }).then(function (result) {
              if (result.isConfirmed == true) {
                itens.push(1)

                if (totalPrice == 0) {
                  new_Total.push(parseFloat(result.value[0]))
                  setTotalPrice(parseFloat(result.value[0]))
                } else {
                  new_Total.push(parseFloat(result.value[0]))
                  setTotalPrice(new_Total.reduce(myFunc))
                }
              }
            })
          }}
        >
          <div className="info">
            <div className="info_sup">
              <div className="name">
                <p>Feijoada</p>
              </div>
              <div className="desc">
                Arroz, feijoada, farofa, couve, bisteca suína, torresmo,
                vinagrete e laranja.
              </div>
            </div>
            <div className="info_inf">
              <fotter className="price">A partir de R$ 13,00</fotter>
            </div>
          </div>
          <div className="image">
            <img src="feijoada.jpg"></img>
          </div>
        </div>
      </section>

      <div
        className="fotter"
        onClick={(e) => {
          e.preventDefault()
          if (totalPrice == 0) {
            Swal.fire({
              icon: 'info',
              title: 'Carrinho vazio',
            })
          } else {
            const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger',
              },
              buttonsStyling: false,
            })

            Swal.fire({
              title: '<div id="modal_title"><h4>Carrinho</h4> </div>',
              html:
                '<hr /> ' +
                '<section class="Swal-Container" id="final_container">' +
                '<div class="jorginho" id="msg_size">Items </div> </section>' +
                order +
                '<div class="jorginho" id="msg_size">Observações </div>' +
                ' </section>' +
                '<hr />' +
                '<div id="obs_fotter">' +
                '<textarea id="message" class="textarea"></textarea>' +
                '</div>' +
                '<hr />' +
                '<section class="Swal-Container" id="final_container">' +
                ' <div class="jorginho" id="msg_size">Total </div>' +
                '<div class="jorginho" id="total" >R$' +
                totalPrice +
                '</div>' +
                ' </section>' +
                '<hr />',
              showCancelButton: true,
              confirmButtonText: 'Fazer Pedido',
              cancelButtonText: 'Limpar Carrinho',
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire('Pedido Realizado Com Sucesso !', '', 'success')
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                clearPrice()
                clearDados()
                clearItens()
                Swal.fire('Carrinho Limpo !', '', 'success')
              }
            })
          }
        }}
      >
        <div>
          <p id="amount">{itens.reduce(myFunc)}</p>
          <h5>Carrinho</h5>
          <p id="aloha" value={totalPrice}>
            R$ {totalPrice}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Content
