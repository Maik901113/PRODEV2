const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const path = require('path');
const db = require('./db');

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use('/public', express.static(path.join(__dirname, 'public')));

// Middleware para procesar datos en formato JSON
app.use(express.json());

// Middleware para establecer el tipo de contenido para archivos JavaScript
app.use('*.js', (req, res, next) => {
  res.type('text/javascript');
  next();
});

// Middleware CORS para permitir solicitudes desde cualquier origen
app.use(cors());

// Rutas de registro y login
const userController = require('./controllers/userController');
app.post('/registro', userController.registrarUsuario);
app.post('/login', userController.loginUsuario);

// Registro de empresa
app.post('/registrar-empresa', (req, res) => {
  console.log('Solicitud recibida en /registrar-empresa:', req.body);
  const { nombre, nit, telefono, email, direccion } = req.body;

  if (!validateCompanyFields(nombre, nit, telefono, email, direccion)) {
    return res.status(400).json({ error: 'Por favor, completa todos los campos correctamente.' });
  }

  // Verificar si la empresa ya está registrada
  const query = 'SELECT COUNT(*) AS count FROM empresa WHERE nit = ?';
  db.query(query, [nit], (err, result) => {
    if (err) {
      console.error('Error al verificar la existencia de la empresa:', err);
      return res.status(500).json({ error: 'Error interno del servidor.' });
    }

    if (result[0].count > 0) {
      return res.status(400).json({ error: 'La empresa ya está registrada.' });
    }

    // Insertar la empresa en la base de datos
    const insertQuery = 'INSERT INTO empresa (nombre_completo, nit, telefono, email, direccion) VALUES (?, ?, ?, ?, ?)';
    db.query(insertQuery, [nombre, nit, telefono, email, direccion], (insertErr, insertResult) => {
      if (insertErr) {
        console.error('Error al insertar la empresa:', insertErr);
        return res.status(500).json({ error: 'Error interno del servidor.' });
      }

      console.log('Registro de empresa exitoso:', insertResult);
      return res.status(200).json({ success: 'Registro de empresa exitoso.' });
    });
  });
});

// Rutas de enlace...
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/registro.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.get('/registroDeEmpresa', (req, res) => {
  res.sendFile(__dirname + '/registroDeEmpresa.html');
});

// Middleware para manejar errores 404 (Not Found)
app.use((req, res, next) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Middleware para manejar errores globales
app.use((err, req, res, next) => {
  console.error('Error global:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

// Función para validar campos de empresa
function validateCompanyFields(nombre, nit, telefono, email, direccion) {
  return nombre !== '' && nit !== '' && telefono !== '' && email !== '' && direccion !== '';
}
