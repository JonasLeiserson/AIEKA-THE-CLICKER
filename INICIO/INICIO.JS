

let BotonesDeMejora = document.querySelectorAll(".BotonDeMejora")
let DescripcionesDeMejora = document.querySelectorAll(".infoDeMejora")
let Pollitos = 0
let CantidadASumar = 1
let PorcentajeAdicionalDeClicks = 0 
let Mejoras

let Arroz = false;
let teriyaki = false;
let boll = false;

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
  const descripcion = document.querySelector(`.infoDeMejora[data-id="${id}"]`);
  const texto = document.querySelector(`.TextoDeMejora[data-id="${id}"]`);
  const imagen = document.querySelector(`.ImagenDeMejora[data-id="${id}"]`);

    if (descripcion.getAttribute('data-id') === id)
    {
      descripcion.style.display = mostrar ? 'block' : 'none';
      texto.style.display = mostrar ? 'none' : 'block';
      imagen.style.display = mostrar ? 'none' : 'block';
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


//Span
const BotonDeTexto = document.createElement('span');
BotonDeTexto.innerText = mejora.nombre;
BotonDeTexto.setAttribute("data-id", mejora.id)
BotonDeTexto.setAttribute("class", "TextoDeMejora")

//Div
const DivDeBoton = document.createElement('div');
DivDeBoton.innerText = mejora.descripcion;
DivDeBoton.setAttribute("data-id", mejora.id)
DivDeBoton.setAttribute("class", "infoDeMejora")

//Ruta
BotonDeMejora.appendChild(BotonDeImagen);
BotonDeMejora.appendChild(BotonDeTexto);
BotonDeMejora.appendChild(DivDeBoton);

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
