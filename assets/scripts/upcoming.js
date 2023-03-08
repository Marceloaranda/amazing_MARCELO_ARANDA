
let eventos = data.events;

let upcomingArray = []
for(let i = 0;i<eventos.length;i++){
    if (eventos[i].date > data.currentDate){
        upcomingArray.push(eventos[i])
    }    
} 

let containerCards = document.getElementById("cuerpo")
console.log(containerCards);

let stringCard = ""

function generaCardsEvents(dataArray) {
    for(evento of dataArray) {

        stringCard += `

        <div class="card" style="width: 18rem;">
              <img src=${evento.image}class="card-img-top" alt="cinema">
              <div class="card-body">
                <h5 class="card-title">${evento.name}</h5>
                <p class="card-text">${evento.description}
                </p>
                <div class="d-flex">
                  <p>Price $ ${evento.price}</p>
                  <a href="./details.html" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div> 
        `
    }
}

generaCardsEvents(upcomingArray)

containerCards.innerHTML = stringCard