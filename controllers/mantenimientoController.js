// mantenimientoController.js
const db = require('../db');

exports.finalizarMantenimiento = (req, res) => {
  try {
    const { descripcionMantenimiento } = req.body;
    
    // Lógica para guardar en la tabla historial con la descripción
    db.query(
      'INSERT INTO historial (historialmaquina) VALUES (?)',
      [descripcionMantenimiento],
      (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ mensaje: 'Error al guardar en el historial' });
        }
        
        // Envía una respuesta al cliente, ajusta según tus necesidades
        res.json({ mensaje: 'Mantenimiento finalizado con éxito' });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

exports.irAInsumosRepuestos = (req, res) => {
  // Lógica para redireccionar a la página de insumos y repuestos
  res.redirect('/insumos_repuestos');
};

exports.renderizarMantenimiento = (req, res) => {
  try {
    const numeroTicket = obtenerNumeroTicket(); // Ajusta según tus necesidades
    res.render('mantenimiento', { numeroTicket });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
};
