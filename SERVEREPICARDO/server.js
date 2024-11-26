const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.get('/puntaje', (req, res) => {
    res.json({ mensaje: 'Solicitud GET recibida', data: [1, 2, 3] });
});