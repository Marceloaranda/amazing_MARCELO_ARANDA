// TOMA LOS DATOS DE API Amazing

fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then((response) => response.json())
.then(data => {
  let eventos = data.events
  
  let pastArray = eventos.filter((evento)=> evento.date < data.currentDate)

generaCardsEvents(pastArray)

/// GENERA CATEGORIAS PARA HTML************************

let categorias = eventos.map((evento) => evento.category)
let categorys = categorias.filter((cat, indice) => {
   return categorias.indexOf(cat) === indice;
})
generaCat(categorys)
//// **************************************************


// FUNCIONES DE FILTROS

const input = document.querySelector('input.form-control')
input.addEventListener('input',filtroCruzado)

function filtroCruzado (){
  let arrayTextoIngresado = filtrarXTexto(pastArray,input.value)
  let arrayFiltrado = filtrarXCat(arrayTextoIngresado)
  generaCardsEvents(arrayFiltrado)
}

const divCheckBoxs = document.querySelector('#catlist')
divCheckBoxs.addEventListener('change',filtroCruzado)


})



//  GENERA TARJETAS PARA HTML ******************************************

let containerCards = document.getElementById("cuerpo")
let generaCardsEvents = (dataArray) => {

  if(dataArray.length == 0){
    containerCards.innerHTML = "<h2 class='display-1 fw-bolder'>There are no matching items!</h2>"
    return
}
  let stringCard = ""
  dataArray.forEach(evento => {
    stringCard += `

        <div class="card" style="width: 18rem;">
              <img src=${evento.image}class="card-img-top" alt="cinema">
              <div class="card-body">
                <h5 class="card-title">${evento.name}</h5>
                <p class="card-text">${evento.description}
                </p>
                <div class="d-flex">
                  <p>Price $ ${evento.price}</p>
                  <a href="./details.html?_id=${evento._id}" class="btn btn-primary">Details</a>
                </div>
              </div>
            </div> 
        `
  })

  containerCards.innerHTML = stringCard
}



/// GENERA CATEGORIAS PARA HTML*********************************************************************

let containerCategory = document.getElementById("catlist")
//console.log(containerCategory)

let generaCat = (dataArray) => {
  let stringCat = ""
  dataArray.forEach(cat => {
                                                                                      
    stringCat += `
    <div class="form-check form-check-inline">
    <label class="form-check-label"><input class="form-check-input" name="position1" type="checkbox" value="${cat}">${cat}</label>
    </div>
        `
  })

  containerCategory.innerHTML = stringCat
}


/// FILTOR POR CATEGORIA

function filtrarXCat(lista){
  let radios = Array.from(document.querySelectorAll("input[type='checkbox']"))
  let radioCheckeado = radios.filter((radio) => radio.checked).map((radio) => radio.value)
  if (radioCheckeado.length === 0){
    return lista
  } else {
  let eventFiltrado = lista.filter((elemento) => radioCheckeado.includes(elemento.category))
  return eventFiltrado;
}
}

// FILTO POR TEXTO 

function filtrarXTexto(array, texto){
  let arrayTextoIngresado= array.filter(evento => evento.name.toLowerCase().includes(texto.toLowerCase()))
  return arrayTextoIngresado
}



