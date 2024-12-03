const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');
const PORT = 3000;

app.use(express.json());
app.use(cors());
console.log("Servidor Express arrancando...");

let puntajes = 0
let Nombre = ""


app.post('/puntaje', (req, res) => 
  {
    const {puntaje} = req.body
    puntajes += puntaje
    res.json({ puntajes });  
  });

  app.get('/ActualizarPuntaje', (req, res) => {
    res.json({ puntajes });  
  });


  //sqbodrio

  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pollo',
    database: 'DatosDeLosUsuarios'
});

db.connect(err => {
  console.log('Conectado a la base de datos MySQL');
});

db.query(`
  CREATE TABLE IF NOT EXISTS jugadores (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(255) NOT NULL,
      puntuacion INT NOT NULL,
      CosasCompradas JSON
  )
`, (err, result) => {
  if (err) throw err;
  console.log('Tabla de jugadores creada o ya existe');
});

app.post('/guardar-jugador', (req, res) => {
  const { nombre, puntuacion, CosasCompradas } = req.body
  const sql = 'INSERT INTO jugadores (nombre, puntuacion, CosasCompradas) VALUES (?, ?, ?)';
  db.query(sql, [nombre, puntuacion, CosasCompradas], (err, result) => {
      if (err) throw err;
      res.send(req.body);
  });
});

app.get('/obtener-jugador/:nombre', (req, res) => {
  const nombre = req.params.nombre;
  const sql = 'SELECT * FROM jugadores WHERE nombre = ?';
  db.query(sql, [nombre], (err, result) => {
    if (result.length === 0) {
      res.status(404).json({ error: 'Jugador no encontrado' });
    } else {
      res.json(result[0]); 
      puntajes = result.puntuacion 
      Nombre = result.nombre

    }
  });
});
app.listen(PORT, () => 
{
  console.log(`Server is running at http://localhost:${PORT}`);
});

app.post('/CargarDatos', (req, res) => {

  res.json({});  

});