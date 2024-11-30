const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const PORT = 3000;
app.use(express.json());
app.use(cors());
console.log("Servidor Express arrancando...");




let puntajes = 0


app.post('/puntaje', (req, res) => 
  {
    const {puntaje} = req.body
    puntajes += puntaje
    res.json({ puntajes });  
  });

  app.get('/ActualizarPuntaje', (req, res) => {
    res.json({ puntajes });  
  });

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });