

let BotonesDeMejora = document.querySelectorAll(".BotonDeMejora")
let DescripcionesDeMejora = document.querySelectorAll(".infoDeMejora")
let Pollitos = 0
function BotonAiekaClickeado()
{
    fetch('http://localhost:3000/puntaje', {
        method: 'GET',  
        headers: {
          'Content-Type': 'application/json',  
        }
      })
      .then(response => response.json())  
      .then(data => {
        Pollitos = data.puntajes
        ActualizarPollitos()
      })
}
function ActualizarPollitos()
{
    fetch('http://localhost:3000/ActualizarPuntaje', {
        method: 'GET',  
        headers: 
        {
          'Content-Type': 'application/json',  
        }
      })
      .then(response => response.json())  
      .then(data => {
        Pollitos = data.puntaje
        console.log('Puntaje actual:', Pollitos);  

        const SpanPollos = document.getElementById("TextoNumeroDePollitos")
        SpanPollos.innerText = "POLLITOS:" + Pollitos 
      })
      
}


function BotonDeMejoraClickeado(index)
{
  switch (index) 
  {
    case Arroz:
      
      break;
    case teriyaki:

      break;
    case valor3:
      
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
window.addEventListener('load', function() 
{
    ActualizarPollitos()
});
