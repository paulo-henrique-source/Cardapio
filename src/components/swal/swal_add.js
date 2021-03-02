import React, { useEffect, useState, } from 'react';
import Swal from 'sweetalert2';
import { Produtos } from '../../api/index';




function SwalAdd() {

    return(
                    Swal.mixin({
                        confirmButtonText: 'Próximo',
                        showCancelButton: true,
                        cancelButtonText: 'Cancelar',
                        allowOutsideClick: true,
                        showCloseButton: true,
                        progressSteps: ['1', '2', '3', '4']
                    }).queue([
                        {
                            title: '<div id="modal_title"><h4>Detalhes</h4> <h5 id="lunch"> ' + listProducts[i]['ASV012_04'] + ' </h5> </div>',
                            html: `<section class="Swal-Container">
                        <div class="jorginho" id="msg_size">Selecione o seu TAMANHO. </div>
                        <div class="jorginho" id="obg">OBRIGATÓRIO</div>
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
                        <hr></hr>`,
                            preConfirm: () => {
                                if ($('input[name="size"]:checked').val() == undefined) {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        html: `<h5 id="error_msg"> Por Favor selecione todos os campos OBRIGATÓRIOS. </h5>`,
                                    })
                                    return false;
                                }
                                house.push(parseFloat($('input[name="size"]:checked').val()))
                                return [                                    
                                    data.size_price = $('input[name="size"]:checked').val(),
                                    setLunchSize($('input[name="size"]:checked')[0].attributes[0].textContent),
                                    data.size = $('input[name="size"]:checked')[0].attributes[0].textContent,
                                ]
                            }
                        },
                        {
                            title: '<div id="modal_title"><h4>Detalhes</h4> <h5 id="lunch"> ' + listProducts[i]['ASV012_04'] + ' </h5> </div>',
                            html: ` <section class="Swal-Container">
                    <div class="jorginho" id="msg_size">Opções de Carne </div>
                    <div class="jorginho" id="obg">OBRIGATÓRIO</div>
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
                    <hr></hr>`,
                    preConfirm: () => {
                        if ($('input[name="option-one"]:checked').val() == undefined) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                html: `<h5 id="error_msg"> Por Favor selecione todos os campos OBRIGATÓRIOS. </h5>`,
                            })
                            return false;
                        }
                    }},
                        {
                            title: '<div id="modal_title"><h4>Detalhes</h4> <h5 id="lunch"> ' + listProducts[i]['ASV012_04'] + ' </h5> </div>',
                            html: `<section class="Swal-Container">
                    <div class="jorginho" id="msg_size">Opções de Carne </div>
                    <div class="jorginho" id="obg">OBRIGATÓRIO</div>
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
                    <hr></hr>`,
                    preConfirm: () => {
                        if ($('input[name="option-two"]:checked').val() == undefined) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                html: `<h5 id="error_msg"> Por Favor selecione todos os campos OBRIGATÓRIOS. </h5>`,
                            })
                            return false;
                        }
                    }},
                        {
                            title: '<div id="modal_title"><h4>Detalhes</h4> <h5 id="lunch"> ' + listProducts[i]['ASV012_04'] + ' </h5> </div>',
                            html: `
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
                            preConfirm: () => {
                                adicionais = ["Sem Adicional"]
                                setLunchAdd(adicionais)
                                $("input:checkbox[name=add]:checked").each(function () {
                                    var chacked = parseFloat($(this).val())
                                    house.push(chacked)
                                    const index = adicionais.indexOf("Sem Adicional");
                                    if (index > -1) {
                                        adicionais.splice(index, 1);
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
                                    data.add = teste,
                                    data.observation = $('#message').val(),

                                    setLunchPrice(house.reduce((a, b) => a + b, 0)),
                                    setLunchName($('#lunch').html()),

                                    dados.push({
                                        title: $('#lunch').html(),
                                        size: data.size,
                                        meat_one: "",
                                        meat_two: "",
                                        add: adicionais,
                                        price: house.reduce((a, b) => a + b, 0)
                                    }),
                                ]
                            }
                        }
                    ]
                    ).then(function (result) {

                        if (result.isConfirmed == true) {
                           
                        }
                        if (result.value) {
                            Swal.fire(
                                'Item adicionado ao carrinho!',
                                '',
                                'success'
                            )
                        }
                    })


    );

}

export default SwalAdd;