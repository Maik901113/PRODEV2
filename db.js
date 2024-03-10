const mysql = require('mysql');


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

  module.exports = db;
  