const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3000;
const path = require('path');

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json());

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

app.use(cors());

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

app.post('/login', async (req, res) => {
  const { username } = req.body;

  try {
    const userExists = await checkUserExists(username);

    res.status(200).json({ exists: userExists });
  } catch (error) {
    console.error('Error al verificar la existencia del usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Función para verificar si un usuario ya existe en la base de datos
async function checkUserExists(username) {
  return new Promise((resolve, reject) => {
    // Consulta SQL para verificar la existencia del usuario
    const query = 'SELECT COUNT(*) AS count FROM usuarios WHERE username = ?';
    db.query(query, [username], (err, result) => {
      if (err) {
        console.error('Error al verificar la existencia del usuario:', err);
        reject(err);
      } else {
        // El resultado es un array de objetos, y result[0].count contiene el número de coincidencias
        resolve(result[0].count > 0);
      }
    });
  });
}

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

// Función para verificar si un usuario ya existe en la base de datos
async function checkUserExists(nombre_completo) {
  return new Promise((resolve, reject) => {
    // Consulta SQL para verificar la existencia del usuario
    const query = 'SELECT COUNT(*) AS count FROM usuarios WHERE nombre_completo = ?';
    db.query(query, [nombre_completo], (err, result) => {
      if (err) {
        console.error('Error al verificar la existencia del usuario:', err);
        reject(err);
      } else {
        // El resultado es un array de objetos, y result[0].count contiene el número de coincidencias
        resolve(result[0].count > 0);
      }
    });
  });
}

function validateFields(nombre, email, documento, rol) {
  return nombre !== '' && email !== '' && documento !== '' && rol !== '';
}
