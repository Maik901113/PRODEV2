const db = require('../db');

// Función para validar campos de usuario
function validateFields(nombre, email, documento, rol) {
  return nombre !== undefined && email !== undefined && documento !== undefined && rol !== undefined;
}

// Función para verificar si el usuario ya existe en la base de datos
async function checkUserExists(username) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT COUNT(*) AS count FROM usuarios WHERE username = ?';
    db.query(query, [username], (err, result) => {
      if (err) {
        console.error('Error al verificar la existencia del usuario:', err);
        reject(err);
      } else {
        resolve(result[0].count > 0);
      }
    });
  });
}

// Función para autenticar al usuario
async function authenticateUser(username, password) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM usuarios WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, result) => {
      if (err) {
        console.error('Error al autenticar al usuario:', err);
        reject(err);
      } else {
        if (result.length > 0) {
          resolve(result[0]);
        } else {
          resolve(null);
        }
      }
    });
  });
}

// Controlador para registrar un nuevo usuario
exports.registrarUsuario = async (req, res, next) => {
  const { nombre, direccion, email, documento, rol, username, password } = req.body;

  console.log('Valores recibidos en el servidor:', { nombre, direccion, email, documento, rol });

  if (!validateFields(nombre, email, documento, rol)) {
    console.log('Campos no válidos. Abortando registro.');
    return res.status(400).json({ error: 'Por favor, completa todos los campos correctamente.' });
  }

  try {
    // Verificar si el usuario ya existe en la base de datos
    const userExists = await checkUserExists(username);

    if (userExists) {
      return res.status(400).json({ error: 'El usuario ya está registrado.' });
    }

    // Realizar la inserción en la base de datos
    const query = 'INSERT INTO usuarios (nombre_completo, direccion, email, documento, id_roles, username, password) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [nombre, direccion, email, documento, rol, username, password];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error al insertar usuario:', err);
        return next(err);
      }
      console.log('Registro exitoso:', result);
      return res.status(200).json({ success: 'Usuario registrado exitosamente.' });
    });
  } catch (error) {
    console.error('Error en el registro de usuario:', error);
    return next(error);
  }
};

// Controlador para realizar el login de un usuario
exports.loginUsuario = async (req, res, next) => {
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
    return next(error);
  }
};
