const express = require('express');

let Pollitos = 0
function BotonAiekaClickeado()
{
Pollitos = Pollitos + 1 
const SpanPollos = document.getElementById("TextoNumeroDePollitos")
SpanPollos.innerText = "POLLITOS:" + Pollitos 

fetch('http://localhost:3000/puntaje', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({Pollitos}),
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

}