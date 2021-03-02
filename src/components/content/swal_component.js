export const headerSwalSize = () => {
    return (`<section class="Swal-Container">
    <div class="jorginho" id="msg_size">Selecione o seu TAMANHO. </div>
    <div class="jorginho" id="obg">OBRIGATÓRIO</div>
    </section>`)
}

export const headerSwalMeatOne = () => {
    return (`<section class="Swal-Container">
    <div class="jorginho" id="msg_size">Opções de Carne </div>
    <div class="jorginho" id="obg">OBRIGATÓRIO</div>
    </section>`)
}

export const headerSwalAdd = () => {
    return (`
    <section class="Swal-Container">
    <div class="jorginho" id="msg_size">Adicionais</div>
    </section>`)
}



export const meatTwoSwal = () => {
    return (`                        <div class = "select_container"> 
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
<hr></hr>`)
}

export const addSwal = () => {
    return (`<div class = "select_container"> 
    <div class ="c_info"> 
        <p id="c_desc">Panqueca</p>
        <p id="c_price">R$ 4.00</p>
    </div>
    <div class ="c_button"> 
        <input placeholder="Panqueca" name="add" type="checkbox" value="4.00"/>
    </div>
    </div>
    <hr></hr>

    
    <div class = "select_container"> 
    <div class ="c_info"> 
        <p id="c_desc">Banana</p>
        <p id="c_price">R$ 1.50</p>
    </div>
    <div class ="c_button"> 
        <input placeholder="Banana" name="add" type="checkbox" value="1.50"/>
    </div>
    </div>
    <hr></hr>


    <div class = "select_container"> 
    <div class ="c_info"> 
        <p id="c_desc">Ovo</p>
        <p id="c_price">R$ 1.50</p>
    </div>
    <div class ="c_button"> 
        <input placeholder="Ovo" name="add" type="checkbox" value="1.50"/>
    </div>
    </div>
    <hr></hr>

    <div class = "select_container"> 
    <div class ="c_info"> 
        <p id="c_desc">Porção 100g</p>
        <p id="c_price">R$ 6.00</p>
    </div>
    <div class ="c_button"> 
        <input placeholder="Porção 100g" name="add" type="checkbox" value="6.00"/>
    </div>
    </div>
    <hr></hr>

    <div class = "select_container"> 
    <div class ="c_info"> 
        <p id="c_desc">Porção (Meia) 400g</p>
        <p id="c_price">R$ 20.00</p>
    </div>
    <div class ="c_button"> 
        <input placeholder="Porção (Meia) 400g" name="add" type="checkbox" value="20.00"/>
    </div>
    </div>
    <hr></hr>

    <div class = "select_container"> 
    <div class ="c_info"> 
        <p id="c_desc">Porção (Inteira) 800g</p>
        <p id="c_price">R$ 40.00</p>
    </div>
    <div class ="c_button"> 
        <input placeholder="Porção (Inteira) 800g" name="add" type="checkbox" value="40.00"/>
    </div>
    </div>
    <hr></hr>
    </div>`)
}