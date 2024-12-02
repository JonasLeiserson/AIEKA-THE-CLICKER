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
    user: '49516747',
    password: 'pollo',
    database: 'DatosImportantes'
});

db.connect(err => {
  if (err) {
      throw err;
  }
  console.log('Conectado a la base de datos MySQL');
});

db.query(`
  CREATE TABLE IF NOT EXISTS jugadores (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(255) NOT NULL,
      puntuacion INT NOT NULL
  )
`, (err, result) => {
  if (err) throw err;
  console.log('Tabla de jugadores creada o ya existe');
});

app.post('/guardar-jugador', (req, res) => {
  const { nombre, puntuacion } = req.body;
  const sql = 'INSERT INTO jugadores (nombre, puntuacion) VALUES (?, ?)';
  db.query(sql, [nombre, puntuacion], (err, result) => {
      if (err) throw err;
      res.send('Datos guardados');
  });
});

app.get('/obtener-jugador/:nombre', (req, res) => {
  const nombre = req.params.nombre;
  const sql = 'SELECT * FROM jugadores WHERE nombre = ?';
  db.query(sql, [nombre], (err, result) => {
      if (err) throw err;
      res.json(result);
  });
});
app.listen(PORT, () => 
{
  console.log(`Server is running at http://localhost:${PORT}`);
});