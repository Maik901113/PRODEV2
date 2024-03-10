const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3000;
const db = require('./db');
const path = require('path');

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use('*.js', (req, res, next) => {
  res.type('text/javascript');
  next();
});


app.use(cors());

//registrar
app.post('/registro', async (req, res) => {
  const { nombre, direccion, email, documento, rol, username, password } = req.body;

  console.log('Valores recibidos en el servidor:', { nombre, direccion, email, documento, rol });
  

  if (!validateFields(nombre, email, documento, rol)) {
    console.log('Campos no válidos. Abortando registro.');
    return res.status(400).json({ error: 'Por favor, completa todos los campos correctamente.' });
  }

  // Verificar si el usuario ya existe en la base de datos
  const userExists = await checkUserExists(nombre);

  if (userExists) {
    return res.status(400).json({ error: 'El usuario ya está registrado.' });
  }

  const query = 'INSERT INTO usuarios (nombre_completo, direccion, email, documento, id_roles, username, password) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [nombre, direccion , email, documento, rol, username, password];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al insertar usuario:', err);
      return res.status(500).json({ error: 'Error interno del servidor.' });
    }
    console.log('Registro exitoso:', result);

    return res.status(200).json({ success: 'Usuario registrado exitosamente.' });
  });
});


// login
app.use(cors());

// Función para autenticar al usuario
// Ruta para el login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificar las credenciales en la base de datos
    const user = await authenticateUser(username, password);

    if (user) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(401).json({ exists: false });
    }
  } catch (error) {
    console.error('Error al autenticar al usuario:', error);
    return res.status(500).json({ exists: false });
  }
});



//registro de empresa
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
      return res.status(200).json({ continuar: true });
    });
  });
});

//RUTAS DE ENLACE //
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/registro.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.get('/registroDeEmpresa', (req, res) => {
  res.sendFile(__dirname + '/registroDeEmpresa.html');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

function validateFields(nombre, email, documento, rol) {
  return nombre !== '' && email !== '' && documento !== '' && rol !== '';
}

