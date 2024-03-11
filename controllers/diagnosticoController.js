// diagnosticoController.js
const axios = require('axios');
const db = require('../db');

exports.registrarDiagnostico = async (req, res) => {
  try {
    const { diagnostico, id_ticket, id_salida } = req.body;

    // Validar campos
    if (!diagnostico || !id_ticket || !id_salida) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    // Realizar la petición al servidor usando Axios
    const response = await axios.post('http://localhost:3000/diagnostico/registrar-diagnostico', {
      diagnostico,
      id_ticket,
      id_salida,
    });

    // Manejar la respuesta del servidor
    console.log('Respuesta del servidor:', response.data);
    return res.status(200).json({ success: 'Registro de diagnóstico exitoso.' });
  } catch (error) {
    console.error('Error al enviar diagnóstico:', error.message);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
};
