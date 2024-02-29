const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Configurar la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pro_dev_final',
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos');
  }
});

// Ruta de ejemplo para obtener datos
app.get('/obtener-datos', (req, res) => {
  const query = 'SELECT * FROM tu_tabla';

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      res.json(result);
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
