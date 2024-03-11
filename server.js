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
const empresaController = require('./controllers/empresaController'); // Importar el controlador
app.post('/registrar-empresa', empresaController.registrarEmpresa); // Usar el controlador de empresas


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

