

let BotonesDeMejora = document.querySelectorAll(".BotonDeMejora")
let DescripcionesDeMejora = document.querySelectorAll(".infoDeMejora")
let Pollitos = 0

let Arroz = false;
let teriyaki = false;
let boll = false;

function ActualizarImagen()
{
const ImagenDePollo = document.getElementById("botonAieka")
ImagenDePollo.src = "url('../IMAGENES/pollitobase.jfif')";

if (Arroz === true) {
  botonAieka.style.backgroundImage = "url('../IMAGENES/arrozconpollo.jfif')";
} 
}
function BotonAiekaClickeado()
{
  let CantidadASumar = 1
  if (Arroz === true)
  {
    CantidadASumar = 2
  }

  SumarORestarPuntaje(CantidadASumar)
}
function ActualizarPollitos()
{
        SumarORestarPuntaje(0)
        const SpanPollos = document.getElementById("TextoNumeroDePollitos")
        SpanPollos.innerText = "POLLITOS:" + Pollitos 
      
}


function MejoraComprada(index)
{
  ActualizarPollitos()
  switch (index) 
  {
    case Arroz:
      if(Pollitos >= 500)
      {
        alert("Pollito comprado")
        Arroz = true
        SumarORestarPuntaje(-500)
      }
      else
      {
        alert("No hay guita")
      }
      break;
    case teriyaki:

      break;
    case boll:
      
      break;
  }
}


function MostrarDescripicionMejora(button)
{
  const id = button.getAttribute('data-id');
  const descripcion = document.querySelector(`.infoDeMejora[data-id="${id}"]`);
  const texto = document.querySelector(`.TextoDeMejora[data-id="${id}"]`);
  const imagen = document.querySelector(`.ImagenDeMejora[data-id="${id}"]`);

    if (descripcion.getAttribute('data-id') === id)
    {
      descripcion.style.display = 'block';
      texto.style.display = 'none';
      imagen.style.display = 'none';
    }
    
}

function DejarDeMostrarDescripicionMejora(button)
{
  const id = button.getAttribute('data-id');
  const descripcion = document.querySelector(`.infoDeMejora[data-id="${id}"]`);
  const texto = document.querySelector(`.TextoDeMejora[data-id="${id}"]`);
  const imagen = document.querySelector(`.ImagenDeMejora[data-id="${id}"]`);

    if (descripcion.getAttribute('data-id') === id)
    {
      descripcion.style.display = 'none';
      texto.style.display = 'block';
      imagen.style.display = 'block';
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


window.addEventListener('load', function() 
{
    ActualizarPollitos()
});
