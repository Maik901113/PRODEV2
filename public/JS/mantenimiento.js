// obtenerNumeroTicket.js
const db = require('./../../db');

function obtenerNumeroTicket(callback) {
  db.query(
    'SELECT Serial_maquina FROM ingresos WHERE id_ingreso = (SELECT MAX(id_ingreso) FROM ingresos)',
    (error, results) => {
      if (error) {
        console.error(error);
        callback(error, null);
        return;
      }

      const numeroTicket = results[0].Serial_maquina;
      callback(null, numeroTicket);
    }
  );
}

module.exports = obtenerNumeroTicket;
