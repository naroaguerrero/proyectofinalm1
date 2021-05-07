/* VARIABLES */
let listaAlimentos;
let eleccion = "";
let resultados = {};
/* ARRAY */
let arrayFav = [];
/* FUNCIONES */

function buscar() {
  let busqueda = document.getElementById("busqueda").value;
  resultados = {};
  fetch(
    `https://api.spoonacular.com/food/products/search?query=${busqueda}&apiKey=a6b593ef50ba476ca5a1b753c57f81b3`
  )
    .then(function respuesta(respuesta) {
      return respuesta.json();
    })
    .then(function datos(datos) {
      resultados = datos;
      if (datos.products.length === 0) {
        window.alert(
          "Actualmente no tenemos ningun producto con esos datos, inténtelo de nuevo."
        );
      } else {
        for (let i = 0; i < datos.products.length; i++) {
          eleccion += `<div class="card"> 
          <img src="${datos.products[i].image}" alt="Cartel" style="width:100%"/>
          <div class="container">
            <h4 class="tituloColor"><b>${datos.products[i].title}</b></h4>
          </div>
          <button id="botonFav" onclick="fav(${i})">Favorito</button>
        </div>`;
        }
        document.getElementById("recetas").innerHTML = eleccion;
      }
    });
}

function fav(i) {
  console.log("grabando");
  console.log(resultados.products[i].title);
  let favorito = {
    imagen: resultados.products[i].image,
    titulo: resultados.products[i].title.substring(0, 20),
  };
  arrayFav.push(favorito);
  console.log(arrayFav);
  localStorage.setItem("favoritos", JSON.stringify(arrayFav));
}

function favComida() {
  let favoritoRecu = JSON.parse(localStorage.getItem("favoritos"));
  eleccion = "";
  for (let i = 0; i < favoritoRecu.length; i++) {
    eleccion += `<div class="card"> 
        <img src="${favoritoRecu[i].imagen}" alt="Cartel" style="width:100%"/>
        <div class="container">
          <h4 class="tituloColor"><b>${favoritoRecu[i].titulo}</b></h4>
        </div>
      </div>`;
  }
  document.getElementById("favoritos").innerHTML = eleccion;
}
