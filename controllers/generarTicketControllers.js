// Importa tu conexión a la base de datos y otras dependencias necesarias
const db = require('../db'); // Ajusta la ruta según tu estructura de archivos

function generarTicket(req, res) {
  const { serialMaquina, codigoTecnico } = req.body;

  // Lógica para generar el número de ticket
  const numeroTicket = generarNumeroTicket();

  // Obtener el documento del técnico desde la base de datos
  obtenerDocumentoTecnico()
    .then((documento) => {
      const ticketData = {
        estado_ticket: 'Activo',
        // id_usuario: /* Ajusta el valor según tus necesidades */,
        // descripcion_cierre: /* Ajusta el valor según tus necesidades */,
        // id_mantenimiento: /* Ajusta el valor según tus necesidades */,
        // id_ingreso: /* Ajusta el valor según tus necesidades */,
        numero_ticket: numeroTicket,
        documento: documento, // Agrega el documento del técnico aquí
      };

      // Realizar la inserción en la base de datos
      db.query('INSERT INTO ticket SET ?', ticketData, (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).send('Error interno del servidor');
        }

        // Aquí puedes enviar el número de ticket generado como respuesta al cliente
        res.render('formulario', { serialMaquina, codigoTecnico, numeroTicket, documento });
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    });
}

function generarNumeroTicket() {
  // Lógica para generar el número de ticket
  // Puedes utilizar algún algoritmo o simplemente un valor aleatorio
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

function obtenerDocumentoTecnico() {
  return new Promise((resolve, reject) => {
    // Lógica para obtener el documento del técnico desde la base de datos
    db.query(
      'SELECT documento FROM usuarios ORDER BY id_usuario DESC LIMIT 1',
      (error, results) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          const documento = results.length > 0 ? results[0].documento : null;
          resolve(documento);
        }
      }
    );
  });
}

module.exports = {
  generarTicket,
};
