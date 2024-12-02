

let BotonesDeMejora = document.querySelectorAll(".BotonDeMejora")
let DescripcionesDeMejora = document.querySelectorAll(".infoDeMejora")
let Pollitos = 0
let CantidadASumar = 1
let PorcentajeAdicionalDeClicks = 0 
let Mejoras

let Arroz = false;
let teriyaki = false;
let boll = false;
let Nombre = ""
function ActualizarImagen()
{
const ImagenDePollo = document.getElementById("botonAieka")
ImagenDePollo.src = "url('../IMAGENES/pollitobase.jfif')";

if (Arroz === true) 
  {
  botonAieka.style.backgroundImage = "url('../IMAGENES/arrozconpollo.jfif')";
} 
}

function BotonAiekaClickeado()
{
  SumarORestarPuntaje((CantidadASumar + (CantidadASumar * PorcentajeAdicionalDeClicks /100)))
}

function ActualizarPollitos()
{
        const SpanPollos = document.getElementById("TextoNumeroDePollitos")
        SpanPollos.innerText = "POLLITOS:" + Math.round(Pollitos)
      
}


function MejoraComprada(mejora)
{
  mejora.comprada = true
  if (mejora.efecto.incrementoPollitosPorClic) 
  {
    CantidadASumar += mejora.efecto.incrementoPollitosPorClic;
  }
  else if (mejora.efecto.AumentarPorcentaje) 
  {
      PorcentajeAdicionalDeClicks += mejora.efecto.AumentarPorcentaje;
  }
  ActualizarPollitos()
}


function MostrarDescripicionMejora(button, mostrar)
{
  const id = button.getAttribute('data-id');
  const descripcion = document.querySelector(`.DivinfoDeMejora[data-id="${id}"]`);
 

    if (descripcion.getAttribute('data-id') === id)
    {
      descripcion.style.display = mostrar ? 'block' : 'none' 
    }
    
}


function SumarORestarPuntaje(puntajeASumar)
{
    
    fetch('http://localhost:3000/puntaje', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ puntaje: puntajeASumar })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        Pollitos = data.puntajes; 
        ActualizarPollitos();
      })
}
function CrearBotones()
{
  Mejoras.forEach(mejora => 
{

//Boton
const BotonDeMejora = document.createElement("button");
BotonDeMejora.setAttribute("data-id", mejora.id)
BotonDeMejora.setAttribute("class", "BotonDeMejoraCss")

BotonDeMejora.onclick = function() 
{
  SumarORestarPuntaje(0)
  if (Pollitos >= mejora.costo)
  {
    SumarORestarPuntaje(-mejora.costo)
    MejoraComprada(mejora); 
    ActualizarPollitos()
    BotonDeMejora.style.display ="none"
  }
  else
  {
    alert("No hay guita, Te faltan " + (mejora.costo - Pollitos) + (" pollitos") )
  }
};

BotonDeMejora.onmouseover = function() {
  MostrarDescripicionMejora(BotonDeMejora, true);
};

BotonDeMejora.onmouseout = function() {
  MostrarDescripicionMejora(BotonDeMejora, false); 
};

//Imagen
const BotonDeImagen = document.createElement('img');
BotonDeImagen.src = mejora.imagen;
BotonDeImagen.alt = 'Imagen del botón';
BotonDeImagen.setAttribute("data-id", mejora.id)
BotonDeImagen.setAttribute("class", "ImagenDeMejora")

const DivDeCostoEImagen = document.createElement('div');
DivDeCostoEImagen.setAttribute("data-id", mejora.id)
DivDeCostoEImagen.setAttribute("class", "DivDeCostoEImagen") 

const ImagenDePollitos = document.createElement('img');
ImagenDePollitos.src = "../IMAGENES/patita de pollo.png";
ImagenDePollitos.alt = 'Imagen del botón';
ImagenDePollitos.setAttribute("data-id", mejora.id)
ImagenDePollitos.setAttribute("class", "ImagenPatitaDePollo2")

//GranDiv
const DivTotal = document.createElement('div');
DivTotal.setAttribute("data-id", mejora.id)
DivTotal.setAttribute("class", "DivinfoDeMejora")

//Div de nombre y costo
const DivDeArriba = document.createElement('div');
DivDeArriba.setAttribute("data-id", mejora.id)
DivDeArriba.setAttribute("class", "DivDeArribainfoDeMejora")

//Nombre
const Texto = document.createElement('span');
Texto.innerText = mejora.nombre;
Texto.setAttribute("data-id", mejora.id)
Texto.setAttribute("class", "TextoDeMejora")

//Costo
const Costo = document.createElement('span');
Costo.innerText = mejora.costo;
Costo.setAttribute("data-id", mejora.id)
Costo.setAttribute("class", "TextoDeMejora")

//Descripcion
const DivDeAbajo = document.createElement('div');
DivDeAbajo.innerText =  mejora.descripcion;
DivDeAbajo.setAttribute("data-id", mejora.id)
DivDeAbajo.setAttribute("class", "infoDeMejora")

//Ruta

BotonDeMejora.appendChild(BotonDeImagen);
DivTotal.appendChild(DivDeArriba);
DivDeArriba.appendChild(Texto);
DivDeArriba.appendChild(DivDeCostoEImagen);
DivDeCostoEImagen.appendChild(Costo);
DivDeCostoEImagen.appendChild(ImagenDePollitos);
DivTotal.appendChild(DivDeAbajo);
BotonDeMejora.appendChild(DivTotal);

const Ruta = document.getElementById('Mejoras');
Ruta.appendChild(BotonDeMejora);
});
}
window.addEventListener('load', function() 
{
  SumarORestarPuntaje(0)
  const SpanPollos = document.getElementById("TextoNumeroDePollitos")
  SpanPollos.innerText = "POLLITOS:" + Pollitos 

  fetch('../datos/DatosMejoras.json')
  .then(response => response.json())
  .then(data => 
  {   
    Mejoras = data.mejoras  
    console.log(Mejoras)   
    CrearBotones()    
  });    
});    

async function guardarDatosJugador() {  
  const nombre = prompt("Pone tu nombre")
  const datos = { nombre: nombre, puntuacion: Pollitos };   
  const response = await fetch('http://localhost:3000/guardar-jugador', {    
      method: 'POST',    
      headers: 
      {   
          'Content-Type': 'application/json'  
      },   
      body: JSON.stringify(datos)    
  });
  const result = await response.text();
  console.log(result);
}

async function obtenerDatosJugador() 
{
  if(Nombre === "")
  {
    Nombre = prompt("Pone tu nombre")
  }
  const response = await fetch(`http://localhost:3000/obtener-jugador/${Nombre}`);
  const datos = await response.json();
  console.log(datos);
  CargarDatos(datos)
}
function CargarDatos(datos)
{
  Nombre = datos.nombre
  Pollitos = datos.puntuacion
}