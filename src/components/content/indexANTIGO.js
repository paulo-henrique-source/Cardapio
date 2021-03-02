import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import Swal from 'sweetalert2'
import './styles.css'
import { methodGET, methodPUT } from '../../api/index'
// import SwalAdd from '../swal/swal_add'/
import moment from 'moment'
import {
  headerSwalSize,
  headerSwalMeatOne,
  meatOneSwal,
  meatTwoSwal,
  headerSwalAdd,
  addSwal,
} from './swal_component'

function Content() {
  const [totalPrice, setTotalPrice] = useState(0)
  const [lunchName, setLunchName] = useState('')
  const [lunchSize, setLunchSize] = useState('')
  const [lunchMeet_One, setLunchMeet_One] = useState('')
  const [lunchMeet_Two, setLunchMeet_Two] = useState('')
  const [lunchAdd, setLunchAdd] = useState([])
  const [lunchPrice, setLunchPrice] = useState(0)
  const [itens, setItens] = useState([0])
  const [listProducts, setListProducts] = useState([])
  const [paymentState, setPaymentState] = useState(0)
  // const [listAdd, setListAdd] = useState([])

  const frete = 5
  const id_empresa = '895120317'
  const clientId = localStorage.getItem('id')

  const [finishOrder, setFinishOrder] = useState({
    ASV013_02: '',
    ASV013_03: '',
    ASV013_04: '',
    ASV013_05: '',
    ASV013_06: '',
    ASV013_07: '',
    ASV013_08: '', //forma pagamento
    ASV013_09: '',
    ASV013_10: '',
    ASV013_11: '',
    ASV013_12: '',
    ASV013_13: '', //troco
    ASV013_14: '',
    itens: [],
  })

  // function change_pay(e) {
  //     e.preventDefault()
  //     // var x = document.getElementById("selectPayment").value;
  //     console.log('teste')
  // }

  function clearDados() {
    setDados([])
  }

  function clearPrice() {
    setTotalPrice(0)
  }

  function clearItens() {
    setItens([0])
  }

  const [data, setData] = useState({
    size_price: 0,
    size: '',
    first_meat: '',
    second_meat: '',
    add: 0,
    observation: '',
  })

  const [dados, setDados] = useState([])

  const url =
    'https://api.groupsoft.com.br/gsserver/datasnap/rest/TServerMethodsApp/Clientes'

  var house = []
  var eco = []
  var chinese = []
  var light = []
  var beens = []

  var new_Total = []
  var adicionais = []
  var lunchPrice_One = []

  var order
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

    if (totalPrice !== 0) {
      var previus = $('#total_price').html().replace('R$ ', '')

      new_Total.push(parseFloat(previus))
    }
  })

  useEffect(async () => {
    const json = await methodGET(url)
    console.log(json)

    if (json !== undefined) {
      console.log(json)
      // console.log(json)
    }
  }, [])

  function renderLunchBox() {
    let lunchBox = []

    Object.keys(listProducts).map((x, i) => {
      lunchBox.push(
        <div
          className="container"
          onClick={(e) => {
            e.preventDefault()

            var price_size = listProducts[i]['ASV017_03'].split(';')

            var header_swal_size = headerSwalSize()
            var header_swal_m1 = headerSwalMeatOne()
            var header_swal_add = headerSwalAdd()

            var size_swal = `<p class = "op_msg">Escolha 1 opção</p>
                    <hr></hr>
                    
                    
                    <div class = "select_container"> 
                                            <div class ="c_info"> 
                                                <p id="c_desc">Pequena</p>
                                                <p id="c_price">R$ ${parseFloat(
                                                  price_size[0]
                                                ).toFixed(2)}</p>
                                            </div>
                                            <div class ="c_button"> 
                                                <input placeholder="Pequena" id="size" name="size" type="radio" value=${parseFloat(
                                                  price_size[0]
                                                ).toFixed(2)}/>
                                            </div>
                                            </div>
                                            <hr></hr>
                                            <div class = "select_container"> 
                                            <div class ="c_info"> 
                                                <p id="c_desc">Média</p>
                                                <p id="c_price">R$ ${parseFloat(
                                                  price_size[2]
                                                ).toFixed(2)}</p>
                                            </div>
                                            <div class ="c_button"> 
                                                <input placeholder="Média" id="size" name="size" type="radio" value=${parseFloat(
                                                  price_size[2]
                                                ).toFixed(2)}/>
                                            </div>
                                            </div>
                                            <hr></hr>
                                            
                                            <div class = "select_container"> 
                                            <div class ="c_info"> 
                                                <p id="c_desc">Grande</p>
                                                <p id="c_price">R$ ${parseFloat(
                                                  price_size[1]
                                                ).toFixed(2)}</p>
                                            </div>
                                            <div class ="c_button"> 
                                                <input placeholder="Grande" id="size" name="size" type="radio" value=${parseFloat(
                                                  price_size[1]
                                                ).toFixed(2)}/>
                                            </div>
                                            </div>
                                            <hr></hr>`
            var meat1_swal = meatOneSwal()
            var meat2_swal = meatTwoSwal()
            var add_swal = addSwal()

            if (listProducts[i]['ASV012_08'] === 2) {
              Swal.mixin({
                confirmButtonText: 'Próximo',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                allowOutsideClick: true,
                showCloseButton: true,
                progressSteps: ['1', '2', '3', '4'],
              })
                .queue([
                  {
                    title:
                      '<div id="modal_title"><h4>Detalhes</h4> <h5 id="lunch"> ' +
                      listProducts[i]['ASV012_04'] +
                      ' </h5> </div>',
                    html: `${header_swal_size}
    
                            ${size_swal}

                            `,
                    preConfirm: () => {
                      if ($('input[name="size"]:checked').val() == undefined) {
                        Swal.fire({
                          icon: 'error',
                          title: 'Oops...',
                          html: `<h5 id="error_msg"> Por Favor selecione todos os campos OBRIGATÓRIOS. </h5>`,
                        })
                        return false
                      }
                      house.push(
                        parseFloat($('input[name="size"]:checked').val())
                      )
                      return [
                        (data.size_price = $(
                          'input[name="size"]:checked'
                        ).val()),
                        setLunchSize(
                          $('input[name="size"]:checked')[0].attributes[0]
                            .textContent
                        ),
                        (data.size = $(
                          'input[name="size"]:checked'
                        )[0].attributes[0].textContent),
                      ]
                    },
                  },
                  {
                    title:
                      '<div id="modal_title"><h4>Detalhes</h4> <h5 id="lunch"> ' +
                      listProducts[i]['ASV012_04'] +
                      ' </h5> </div>',
                    html: ` ${header_swal_m1}
                        
                        <p class = "op_msg" >Escolha a PRIMEIRA opção</p>
                        <hr></hr>
                                ${meat1_swal}
`,
                    preConfirm: () => {
                      if (
                        $('input[name="option-one"]:checked').val() == undefined
                      ) {
                        Swal.fire({
                          icon: 'error',
                          title: 'Oops...',
                          html: `<h5 id="error_msg"> Por Favor selecione todos os campos OBRIGATÓRIOS. </h5>`,
                        })
                        return false
                      }
                      return [
                        (data.first_meat = $(
                          'input[name="option-one"]:checked'
                        ).val()),
                        setLunchMeet_One(
                          $('input[name="option-one"]:checked').val()
                        ),
                      ]
                    },
                  },
                  {
                    title:
                      '<div id="modal_title"><h4>Detalhes</h4> <h5 id="lunch"> ' +
                      listProducts[i]['ASV012_04'] +
                      ' </h5> </div>',
                    html: `<section class="Swal-Container">
                        <div class="jorginho" id="msg_size">Opções de Carne </div>
                        <div class="jorginho" id="obg">OBRIGATÓRIO</div>
                        </section>
    
                        <p class = "op_msg">Escolha a SEGUNDA opção</p>
                        <hr></hr>
    
                        ${meat2_swal}
                        `,
                    preConfirm: () => {
                      if (
                        $('input[name="option-two"]:checked').val() == undefined
                      ) {
                        Swal.fire({
                          icon: 'error',
                          title: 'Oops...',
                          html: `<h5 id="error_msg"> Por Favor selecione todos os campos OBRIGATÓRIOS. </h5>`,
                        })
                        return false
                      }
                      return [
                        (data.second_meat = $(
                          'input[name="option-two"]:checked'
                        ).val()),
                        setLunchMeet_Two(
                          $('input[name="option-two"]:checked').val()
                        ),
                      ]
                    },
                  },
                  {
                    title:
                      '<div id="modal_title"><h4>Detalhes</h4> <h5 id="lunch"> ' +
                      listProducts[i]['ASV012_04'] +
                      ' </h5> </div>',
                    html: `${header_swal_add}
    
                        <p class = "op_msg">Selecione até 6 opções</p>
                        <hr></hr>
    
                        ${add_swal}
                        `,
                    preConfirm: () => {
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

                      itens.push(1)

                      const teste = house.reduce((a, b) => a + b, 0)

                      if (totalPrice == 0) {
                        new_Total.push(parseFloat(teste))
                        setTotalPrice(parseFloat(teste))
                      } else {
                        new_Total.push(parseFloat(teste))
                        setTotalPrice(new_Total.reduce(myFunc))
                      }

                      return [
                        (data.add = teste),
                        (data.observation = $('#message').val()),
                        setLunchPrice(house.reduce((a, b) => a + b, 0)),
                        setLunchName($('#lunch').html()),

                        dados.push({
                          title: $('#lunch').html(),
                          size: data.size,
                          meat_one: data.first_meat,
                          meat_two: data.second_meat,
                          add: adicionais,
                          price: house.reduce((a, b) => a + b, 0),
                          id_marmita: listProducts[i]['ASV012_01'],
                        }),
                      ]
                    },
                  },
                ])
                .then(function (result) {
                  if (result.isConfirmed == true) {
                  }
                  if (result.value) {
                    Swal.fire({
                      title: 'Item Adicionado ao carrinho!',
                      text: '',
                      icon: 'success',
                      timer: 500,
                      timerProgressBar: true,
                      didOpen: () => {
                        Swal.showLoading()
                      },
                    })
                  }
                })
            } else if (listProducts[i]['ASV012_08'] === 1) {
              Swal.mixin({
                confirmButtonText: 'Próximo',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                allowOutsideClick: true,
                showCloseButton: true,
                progressSteps: ['1', '2', '3'],
              })
                .queue([
                  {
                    title:
                      '<div id="modal_title"><h4>Detalhes</h4> <h5 id="lunch"> ' +
                      listProducts[i]['ASV012_04'] +
                      ' </h5> </div>',
                    html: `${header_swal_size}
    
                                ${size_swal}
    `,
                    preConfirm: () => {
                      if ($('input[name="size"]:checked').val() == undefined) {
                        Swal.fire({
                          icon: 'error',
                          title: 'Oops...',
                          html: `<h5 id="error_msg"> Por Favor selecione todos os campos OBRIGATÓRIOS. </h5>`,
                        })
                        return false
                      }
                      house.push(
                        parseFloat($('input[name="size"]:checked').val())
                      )
                      return [
                        (data.size_price = $(
                          'input[name="size"]:checked'
                        ).val()),
                        setLunchSize(
                          $('input[name="size"]:checked')[0].attributes[0]
                            .textContent
                        ),
                        (data.size = $(
                          'input[name="size"]:checked'
                        )[0].attributes[0].textContent),
                      ]
                    },
                  },
                  {
                    title:
                      '<div id="modal_title"><h4>Detalhes</h4> <h5 id="lunch"> ' +
                      listProducts[i]['ASV012_04'] +
                      ' </h5> </div>',
                    html: `${header_swal_m1}
                        
                                <p class = "op_msg" >Escolha a PRIMEIRA opção</p>
                                <hr></hr>
                                        ${meat1_swal}
                                        `,
                    preConfirm: () => {
                      if (
                        $('input[name="option-one"]:checked').val() == undefined
                      ) {
                        Swal.fire({
                          icon: 'error',
                          title: 'Oops...',
                          html: `<h5 id="error_msg"> Por Favor selecione todos os campos OBRIGATÓRIOS. </h5>`,
                        })
                        return false
                      }
                      return [
                        (data.first_meat = $(
                          'input[name="option-one"]:checked'
                        ).val()),
                        setLunchMeet_One(
                          $('input[name="option-one"]:checked').val()
                        ),
                      ]
                    },
                  },
                  {
                    title:
                      '<div id="modal_title"><h4>Detalhes</h4> <h5 id="lunch"> ' +
                      listProducts[i]['ASV012_04'] +
                      ' </h5> </div>',
                    html: `${header_swal_add}
    
                                <p class = "op_msg">Selecione até 6 opções</p>
                                <hr></hr>
            
                                ${add_swal}
                        `,
                    preConfirm: () => {
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

                      itens.push(1)

                      const teste = house.reduce((a, b) => a + b, 0)

                      if (totalPrice == 0) {
                        new_Total.push(parseFloat(teste))
                        setTotalPrice(parseFloat(teste))
                      } else {
                        new_Total.push(parseFloat(teste))
                        setTotalPrice(new_Total.reduce(myFunc))
                      }

                      return [
                        (data.add = teste),
                        (data.observation = $('#message').val()),
                        setLunchPrice(house.reduce((a, b) => a + b, 0)),
                        setLunchName($('#lunch').html()),

                        dados.push({
                          title: $('#lunch').html(),
                          size: data.size,
                          meat_one: data.first_meat,
                          meat_two: '',
                          add: adicionais,
                          price: house.reduce((a, b) => a + b, 0),
                          id_marmita: listProducts[i]['ASV012_01'],
                        }),
                      ]
                    },
                  },
                ])
                .then(function (result) {
                  if (result.isConfirmed == true) {
                  }
                  if (result.value) {
                    Swal.fire({
                      title: 'Item Adicionado ao carrinho!',
                      text: '',
                      icon: 'success',
                      timer: 500,
                      timerProgressBar: true,
                      didOpen: () => {
                        Swal.showLoading()
                      },
                    })
                  }
                })
            } else {
              Swal.mixin({
                confirmButtonText: 'Próximo',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                allowOutsideClick: true,
                showCloseButton: true,
                progressSteps: ['1', '2'],
              })
                .queue([
                  {
                    title:
                      '<div id="modal_title"><h4>Detalhes</h4> <h5 id="lunch"> ' +
                      listProducts[i]['ASV012_04'] +
                      ' </h5> </div>',
                    html: `${header_swal_size}
    
                                ${size_swal}
    `,
                    preConfirm: () => {
                      if ($('input[name="size"]:checked').val() == undefined) {
                        Swal.fire({
                          icon: 'error',
                          title: 'Oops...',
                          html: `<h5 id="error_msg"> Por Favor selecione todos os campos OBRIGATÓRIOS. </h5>`,
                        })
                        return false
                      }
                      house.push(
                        parseFloat($('input[name="size"]:checked').val())
                      )
                      return [
                        (data.size_price = $(
                          'input[name="size"]:checked'
                        ).val()),
                        setLunchSize(
                          $('input[name="size"]:checked')[0].attributes[0]
                            .textContent
                        ),
                        (data.size = $(
                          'input[name="size"]:checked'
                        )[0].attributes[0].textContent),
                      ]
                    },
                  },
                  {
                    title:
                      '<div id="modal_title"><h4>Detalhes</h4> <h5 id="lunch"> ' +
                      listProducts[i]['ASV012_04'] +
                      ' </h5> </div>',
                    html: `${header_swal_add}
    
                                <p class = "op_msg">Selecione até 6 opções</p>
                                <hr></hr>
            
                                ${add_swal}
                        `,
                    preConfirm: () => {
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

                      itens.push(1)

                      const teste = house.reduce((a, b) => a + b, 0)

                      if (totalPrice == 0) {
                        new_Total.push(parseFloat(teste))
                        setTotalPrice(parseFloat(teste))
                      } else {
                        new_Total.push(parseFloat(teste))
                        setTotalPrice(new_Total.reduce(myFunc))
                      }

                      return [
                        (data.add = teste),
                        (data.observation = $('#message').val()),
                        setLunchPrice(house.reduce((a, b) => a + b, 0)),
                        setLunchName($('#lunch').html()),

                        dados.push({
                          title: $('#lunch').html(),
                          size: data.size,
                          meat_one: '',
                          meat_two: '',
                          add: adicionais,
                          price: house.reduce((a, b) => a + b, 0),
                          id_marmita: listProducts[i]['ASV012_01'],
                        }),
                      ]
                    },
                  },
                ])
                .then(function (result) {
                  if (result.isConfirmed == true) {
                  }
                  if (result.value) {
                    Swal.fire({
                      title: 'Item Adicionado ao carrinho!',
                      text: '',
                      icon: 'success',
                      timer: 500,
                      timerProgressBar: true,
                      didOpen: () => {
                        Swal.showLoading()
                      },
                    })
                  }
                })
            }
          }}
        >
          <div className="info">
            <div className="info_sup">
              {/* <div id="nameId" className="name">{listProducts[i]['ASV012_04']}</div> */}
              <div id="nameId" className="name">
                {listProducts[i]['ASV012_04']}
              </div>
              <div className="desc">{listProducts[i]['ASV012_06']}</div>
            </div>
            <div className="info_inf">
              <fotter className="price">
                A partir de R${' '}
                {parseFloat(listProducts[i]['ASV017_03']).toFixed(2)}
              </fotter>
            </div>
          </div>
          <div className="image">
            <img src={listProducts[i]['ASV012_09']}></img>
          </div>
        </div>
      )
      return lunchBox
    })
    return lunchBox
  }

  function myFunc(total, num) {
    return total + num
  }

  return (
    <div className="Content">
      <div className="title">Marmitas</div>

      <section className="card_container">{renderLunchBox()}</section>

      <div className="title">Feijoada (Quartas-feiras e Sábados)</div>

      <section className="card_container" id="container_feijoada">
        <div className="container">
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
            <img src="https://img.itdg.com.br/images/recipes/000/002/998/324387/324387_original.jpg"></img>
          </div>
        </div>
      </section>

      <div
        className="fotter"
        onClick={(e) => {
          e.preventDefault()
          _mountOrder(dados)
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
                `<hr /> 
<section class="payment_container">
<div id="msg_size"> Forma de pagamento</div> 
<div class="payment_box" id='radio_payment'>

    <select id='selectPayment'>
        <option id='type_pay' value='0'>Dinheiro</option>
        <option id='type_pay' value='1'>Cartão (levar maquininha)</option>
    </select>
</div> 
</section>
<hr />

</section>` +
                `<div id='final_info'>
                                        
<div id="msg_size"> Pedido </div> 
<div id="total"> R$ ${parseFloat(totalPrice).toFixed(2)} </div> 
<div id="msg_size"> Frete </div> 
<div id="total"> R$ 5.00 </div> 
<hr/>  <hr/>
<div id="msg_size"> Total </div> 
<div id="total"> R$ ${parseFloat(totalPrice + 5).toFixed(2)} </div>
<hr/>  <hr/>                                 
</div>
</hr>`,
              showCancelButton: true,
              confirmButtonText: 'Fazer Pedido',
              cancelButtonText: 'Limpar Carrinho',
              showCloseButton: true,
              preConfirm: () => {
                if (!clientId) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    html: `<h5 id="error_msg"> Você precisa estar logado para finalizar seu pedido. </h5>`,
                    showCloseButton: true,
                  })
                }
              },
            }).then((result) => {
              if ($('#message').val() === null) {
                finishOrder.ASV013_14 = ''
              } else {
                finishOrder.ASV013_14 = $('#message').val()
              }

              finishOrder.ASV013_02 = id_empresa
              finishOrder.ASV013_03 = clientId
              finishOrder.ASV013_04 = moment().format('DD/MM/YYYY')
              finishOrder.ASV013_05 = moment().format('DD/MM/YYYY')
              finishOrder.ASV013_06 = moment().format('hh:mm:ss')
              finishOrder.ASV013_07 = 'A'
              finishOrder.ASV013_08 = $('option[id="type_pay"]:checked').val()
              finishOrder.ASV013_09 = totalPrice.toString()
              finishOrder.ASV013_10 = frete.toString() // frete
              finishOrder.ASV013_11 = '0' // desconto
              finishOrder.ASV013_12 = (totalPrice + frete).toString()

              var x
              for (x in dados) {
                finishOrder.itens.push({
                  ASV014_03: dados[x].id_marmita,
                  ASV014_04: '1',
                  ASV014_05: dados[x].price,
                  ASV014_06: '0',
                  ASV014_07: '0', // ???
                  ASV014_08: 'teste',
                  // ASV014_08: [dados[x].add, dados[x].meat_one, dados[x].meat_two, dados[x].size],
                })
              }

              if (result.isConfirmed) {
                if ($('option[id="type_pay"]:checked').val() === '0') {
                  Swal.fire({
                    title: 'Finalizar Pedido',
                    html: `
                                            
                                        
                                        <div id='msg_troco'>Seu pedido ficou R$ ${parseFloat(
                                          totalPrice + 5
                                        ).toFixed(2)}</div>

                                        <hr />
                                        <div id='payment_cash'>
                                            <section class="payment_container">
                                                <div id="msg_size"> Vai precisar de troco?</div> 
                                                <div  id='radio_payment'>
    
                                                    <select>
                                                        <option id='type_troco' value='0'>Não</option>
                                                        <option id='type_troco' value='1'>Sim</option>
                                                    </select>
                                                </div>
    
    
                                                <div><p id='troco_p'>Troco Para quanto?</p></div> 
    
                                                <input type="number" id="troco" maxlength="5" placeholder='R$' />
    
                                            </section>
                                            <hr />
                                        </div>
                                        `,
                    showCloseButton: true,
                    confirmButtonText: 'Finalizar Pedido',
                    allowOutsideClick: true,
                    // preConfirm: () => {

                    // }
                  }).then((result) => {
                    if ($('option[id="type_troco"]:checked').val() === '1') {
                      finishOrder.ASV013_13 = $('#troco').val()
                    } else {
                      finishOrder.ASV013_13 = '0'
                    }

                    if (result.isConfirmed) {
                      Swal.fire(
                        'Pedido Realizado Com Sucesso !',
                        '',
                        'success'
                      ).then((result) => {
                        // console.log(finishOrder)
                        methodPUT(
                          'https://api.groupsoft.com.br/gsserver/datasnap/rest/TServerMethodsApp/Pedido',
                          finishOrder
                        ).then((result) => {
                          // console.log(result)
                          window.location.href = '/'
                        })
                      })
                    }
                  })
                }

                if ($('option[id="type_pay"]:checked').val() === '1') {
                  Swal.fire(
                    'Pedido Realizado Com Sucesso !',
                    '',
                    'success'
                  ).then((result) => {
                    finishOrder.ASV013_13 = '0' //troco

                    // console.log(finishOrder)
                    methodPUT(
                      'https://api.groupsoft.com.br/gsserver/datasnap/rest/TServerMethodsApp/Pedido',
                      finishOrder
                    ).then((result) => {
                      // console.log(result)
                      window.location.href = '/'
                    })
                  })
                }
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                clearPrice()
                clearDados()
                clearItens()
                Swal.fire('Carrinho Limpo !', '', 'success').then((result) => {
                  finishOrder.itens = []
                  console.log(finishOrder)
                })
              }
            })
          }
        }}
      >
        <div>
          <p id="amount">{itens.reduce(myFunc)}</p>
          <h5>Carrinho</h5>
          <p id="total_price" value={totalPrice}>
            R$ {totalPrice}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Content
