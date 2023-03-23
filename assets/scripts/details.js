// TOMA LOS DATOS DE API Amazing

fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then((response) => response.json())
.then(data => {
  let eventos = data.events
  
  const queryString = location.search
  let params = new URLSearchParams(queryString)
  
  let _id = params.get("_id")
  /* Buscar dato por id */
  let profile = eventos.find(evento => evento._id == _id)
  
  /* Renderizar profile */
  const container = document.getElementById("container-detail");
  let html = ""
  
  html += `
  <div class="detail-image-container">
              <img src="${profile.image}" alt="${profile.name}">
            </div>
            <div class="details-text-container">
              <h3>${profile.name}</h3>
              <p>Date: <span>${profile.date}</span></p>
              <p>Description: <span>${profile.description}</span></p>
              <p>Category: <span>${profile.category}</span></p>
              <p>Place: <span>${profile.place}</span></p>
              <p>Capacity: <span>${profile.capacity}</span></p>
              <p>Assistance: <span>${profile.assistance}</span></p>
              <p>Price: <span>${profile.price}</span></p>
            </div>
      `
  container.innerHTML = html



})

/* 
<div class="detail-image-container">
              <img src="${profile.image}" alt="${profile.name}">
            </div>

 */




/* 
let eventos = data.events

const queryString = location.search
let params = new URLSearchParams(queryString)

let _id = params.get("_id")
/* Buscar dato por id */
/* let profile = eventos.find(evento => evento._id == _id) */

/* Renderizar profile */
/* const container = document.getElementById("container-detail");
let html = ""

html += `
<div class="detail-image-container">
            <img src="${profile.image}" alt="${profile.name}">
          </div>

          <div class="details-text-container">
            <h3>${profile.name}</h3>
            <p>Date: <span>${profile.date}</span></p>
            <p>Description: <span>${profile.description}</span></p>
            <p>Category: <span>${profile.category}</span></p>
            <p>Place: <span>${profile.place}</span></p>
            <p>Capacity: <span>${profile.capacity}</span></p>
            <p>Assistance: <span>${profile.assistance}</span></p>
            <p>Price: <span>${profile.price}</span></p>
          </div>
    `
container.innerHTML = html



  */


 













































