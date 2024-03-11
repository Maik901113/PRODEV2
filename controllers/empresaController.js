const db = require('../db');

function validateCompanyFields(nombre, nit, telefono, email, direccion) {
    // Verifica que todos los campos tengan algún valor
    if (!nombre || !nit || !telefono || !email || !direccion) {
      return false;
    }
  
    // Puedes agregar lógica de validación adicional aquí según tus requisitos
    // Por ejemplo, verificar el formato del correo electrónico, longitud de los campos, etc.
  
    // Ejemplo adicional: Verificar el formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return false;
    }
  
    // Agrega más validaciones según sea necesario
  
    // Si pasa todas las validaciones, devuelve true
    return true;
  }


exports.registrarEmpresa = (req, res) => {
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
};
