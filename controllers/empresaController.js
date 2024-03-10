const db = require('../db');

exports.registrarEmpresa = (req, res) => {
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
    const insertValues = [nombre, nit, telefono, email, direccion];

    db.query(insertQuery, insertValues, (insertErr, insertResult) => {
      if (insertErr) {
        console.error('Error al insertar la empresa:', insertErr);
        return res.status(500).json({ error: 'Error interno del servidor.' });
      }

      console.log('Registro de empresa exitoso:', insertResult);
      return res.status(200).json({ continuar: true });
    });
  });
};

function validateCompanyFields(nombre, nit, telefono, email, direccion) {
  return nombre !== '' && nit !== '' && telefono !== '' && email !== '' && direccion !== '';
}

function validateFields(nombre, email, documento, rol) {
  return nombre !== '' && email !== '' && documento !== '' && rol !== '';
}
    