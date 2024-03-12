// diagnosticoController.js
const db = require('../db');

exports.registrarDiagnostico = (req, res) => {
  const { diagnostico } = req.body;

  // Validar que se proporcionó el diagnóstico
  if (!diagnostico) {
    return res.status(400).json({ error: 'El campo de diagnóstico es obligatorio.' });
  }

  // Aquí puedes realizar validaciones adicionales si es necesario

  // Insertar datos del diagnóstico en la tabla diagnostico
  const insertarDiagnosticoQuery = 'INSERT INTO diagnostico (descripcion_diagnostico) VALUES (?)';
  db.query(insertarDiagnosticoQuery, [diagnostico], (insertarDiagnosticoErr, insertarDiagnosticoResult) => {
    if (insertarDiagnosticoErr) {
      console.error('Error al insertar diagnóstico:', insertarDiagnosticoErr);
      return res.status(500).json({ error: 'Error interno del servidor.' });
    }

    console.log('Registro de diagnóstico exitoso:', insertarDiagnosticoResult);
    return res.status(200).json({ success: 'Diagnóstico registrado exitosamente.' });
  });
};

