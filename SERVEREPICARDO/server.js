const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const PORT = 3000;
app.use(express.json());
app.use(cors());
console.log("Servidor Express arrancando...");




let puntaje = 0


app.get('/puntaje', (req, res) => {
    puntaje = puntaje + 1
    res.json({ puntaje: puntaje });  
  });
  app.get('/ActualizarPuntaje', (req, res) => {
    res.json({ puntaje: puntaje });  
  });


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });