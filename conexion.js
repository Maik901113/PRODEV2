const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'prodev',
});

db.connect(err => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    throw err;
  }
  console.log('Conectado a la base de datos MySQL');
});

app.post('/registrar_usuario', (req, res) => {
  const userData = req.body;

  const sql = `
    INSERT INTO usuarios (firstName, lastName, email, phoneNumber, username, password, rol)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    userData.firstName,
    userData.lastName,
    userData.email,
    userData.phoneNumber,
    userData.username,
    userData.password,
    userData.rol,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al guardar el usuario en la base de datos:', err);
      res.status(500).json({ success: false });
    } else {
      console.log('Usuario registrado exitosamente');
      res.json({ success: true });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor backend en ejecución en http://localhost:${port}`);
});
