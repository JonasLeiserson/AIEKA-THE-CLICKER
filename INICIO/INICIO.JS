
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
        headers: {
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
window.addEventListener('load', function() 
{
    ActualizarPollitos()
});