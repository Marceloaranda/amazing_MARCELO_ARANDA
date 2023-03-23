// TOMA LOS DATOS DE API Amazing

fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then((response) => response.json())
.then(data => {
  let eventos = data.events
  
  let pastArray = eventos.filter((evento)=> evento.date < data.currentDate)
  let upcomingArray = eventos.filter((evento)=> evento.date > data.currentDate)
  
//    VALORES  TABLA 1 **************************************************************

// ORDENO ARRAY PAST POR CAPACIDAD
pastArray.sort(function(a,b){return b.capacity - a.capacity})
let mayorCapacidadName = pastArray[0].name
let mayorCapacidadValue = pastArray[0].capacity

// ORDENO ARRAY PAST POR POCENTAJE DE ASISTENCIA PARA OBTENER EL MAYOR Y EL MENOR 
let porcAsistencia = pastArray.map((evento) => past(evento))
porcAsistencia.sort(function(a,b){return b.porcent - a.porcent})

let mayorAsistenciaName = porcAsistencia[0].name
let mayorAsistenciaValue = porcAsistencia[0].porcent
let menorAsistenciaName = porcAsistencia[porcAsistencia.length-1].name
let menorAsistenciaValue = porcAsistencia[porcAsistencia.length-1].porcent

dibujaTabla1(mayorAsistenciaName,mayorAsistenciaValue,menorAsistenciaName,menorAsistenciaValue,mayorCapacidadName,mayorCapacidadValue)

//    VALORES TABLA 2 **************************************************************

let listCatUp = filtrarCat(upcomingArray)

listCatUp.forEach(cat => { valoresXCategorias(upcomingArray, cat, "table2")})

console.log(listCatUp)


//    VALORES TABLA 3 **************************************************************

let listCatPast = filtrarCat(pastArray)

listCatPast.forEach(cat => { valoresXCategorias(pastArray, cat, "table3")})

console.log(listCatPast)



})





function past(array) {
  return {name: array.name, porcent: ((array.assistance / array.capacity)*100).toFixed(2), category: array.category}
  }
  
let tabla1 = document.getElementById("tabla1");
function dibujaTabla1(col1Name, col1Value, col2Name, col2Value, col3Name, col3Value) {
  tabla1.innerHTML = `
    <tr>
      <td> ${col1Name}  (${col1Value}%)</td>
      <td> ${col2Name}  (${col2Value}%)</td>
      <td> ${col3Name}  (${col3Value}) </td>
    </tr>
  `

}

function filtrarCat(array){
let categorias = array.map((evento) => evento.category)
let categorys = categorias.filter((cat, indice) => {
   return categorias.indexOf(cat) === indice
  })
  return categorys
}

function valoresXCategorias(array, categoria, table) {
  let revenues = 0
  let sumaAss = 0
  let contCat = 0
  let promSumaAss = 0
  for (evento of array) {
    if (evento.category == categoria) {
      contCat++;
      revenues +=(evento.assistance ? evento.assistance : evento.estimate) * evento.price
      sumaAss += parseFloat(((evento.assistance ? evento.assistance : evento.estimate) * 100 / evento.capacity))
    } 
  }
  promSumaAss = parseFloat(sumaAss / contCat).toFixed(2)

  console.log(categoria, revenues, promSumaAss)


  if (table == "table3") {
    dibujaTabla2_3(tabla3, categoria, revenues, promSumaAss)
  } else {
    dibujaTabla2_3(tabla2, categoria, revenues, promSumaAss)
  } 
}

let tabla2 = document.getElementById("tabla2")
let tabla3 = document.getElementById("tabla3")

function dibujaTabla2_3(tabla, col1, col2, col3) {
  let fila = document.createElement("tr");
  fila.innerHTML = `
    <td>${col1}</td>
    <td>$ ${addCommas(col2)} </td>
    <td>${col3} %</td>
    `
  tabla.appendChild(fila)
}


function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}







