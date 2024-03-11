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

//registro de mantenimiento e ingreso
function validateMaintenanceFields(nombreMaquina, marca, serial, tipoMaquina, descripcion, fechaIngreso, tipoMantenimiento) {
    // Implementa lógica de validación según tus necesidades
    return nombreMaquina && marca && serial && tipoMaquina && descripcion && fechaIngreso && tipoMantenimiento;
  }
  
  exports.registrarMaquina = (req, res) => {
    const { nombreMaquina, marca, serial, tipoMaquina, descripcion, fechaIngreso, tipoMantenimiento } = req.body;
  
    // Validar campos (puedes utilizar la función validateCompanyFields aquí si es necesario)
    if (!validateMaintenanceFields(nombreMaquina, marca, serial, tipoMaquina, descripcion, fechaIngreso, tipoMantenimiento)) {
      return res.status(400).json({ error: 'Por favor, completa todos los campos correctamente.' });
    }
  
    const tipoMantenimientoQuery = 'INSERT IGNORE INTO mantenimiento (nombre_tipo_mantenimiento) VALUES (?)';
    db.query(tipoMantenimientoQuery, [tipoMantenimiento], (tipoMantenimientoErr, tipoMantenimientoResult) => {
      if (tipoMantenimientoErr) {
        console.error('Error al insertar tipo de mantenimiento:', tipoMantenimientoErr);
        return res.status(500).json({ error: 'Error interno del servidor.' });
      }
  
      // Obtener el ID del tipo de mantenimiento
      const obtenerTipoMantenimientoQuery = 'SELECT id_mantenimiento FROM mantenimiento WHERE nombre_tipo_mantenimiento = ?';
      db.query(obtenerTipoMantenimientoQuery, [tipoMantenimiento], (obtenerTipoMantenimientoErr, obtenerTipoMantenimientoResult) => {
        if (obtenerTipoMantenimientoErr) {
          console.error('Error al obtener tipo de mantenimiento:', obtenerTipoMantenimientoErr);
          return res.status(500).json({ error: 'Error interno del servidor.' });
        }
  
        const idTipoMantenimiento = obtenerTipoMantenimientoResult[0].id_mantenimiento;
  
        // Insertar datos de la máquina en la tabla de ingresos con el serial
        const insertarMaquinaQuery = 'INSERT INTO ingresos (nombre_de_maquina, Marca_de_maquina, serial, descripcion, fecha_ingreso, id_mantenimiento) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(insertarMaquinaQuery, [nombreMaquina, marca, serial, descripcion, fechaIngreso, idTipoMantenimiento], (insertarMaquinaErr, insertarMaquinaResult) => {
          if (insertarMaquinaErr) {
            console.error('Error al insertar máquina:', insertarMaquinaErr);
            return res.status(500).json({ error: 'Error interno del servidor.' });
          }
  
          console.log('Registro de máquina exitoso:', insertarMaquinaResult);
          return res.status(200).json({ success: 'Registro de máquina exitoso.' });
        });
      });
    });
  };
  exports.registrarMantenimiento = (req, res) => {
    const { nombreMaquina, marca, serial, tipoMaquina, descripcion, fechaIngreso, tipoMantenimiento } = req.body;
  
    // Validar campos (puedes utilizar la función validateCompanyFields aquí si es necesario)
  
    // Definir valores permitidos para tipoMantenimiento
    const allowedMantenimientoValues = ['preventivo', 'correctivo'];

  if (allowedMantenimientoValues.includes(tipoMantenimiento)) {
    // Insertar tipo de mantenimiento si no existe
    const tipoMantenimientoQuery = 'INSERT IGNORE INTO mantenimiento (nombre_tipo_mantenimiento) VALUES (?)';
    db.query(tipoMantenimientoQuery, [tipoMantenimiento], (tipoMantenimientoErr, tipoMantenimientoResult) => {
      if (tipoMantenimientoErr) {
        console.error('Error al insertar tipo de mantenimiento:', tipoMantenimientoErr);
        return res.status(500).json({ error: 'Error interno del servidor.' });
      }

      // Obtener el ID del tipo de mantenimiento (ya existe o acaba de ser creado)
      const obtenerTipoMantenimientoQuery = 'SELECT id_mantenimiento FROM mantenimiento WHERE nombre_tipo_mantenimiento = ?';
      db.query(obtenerTipoMantenimientoQuery, [tipoMantenimiento], (obtenerTipoMantenimientoErr, obtenerTipoMantenimientoResult) => {
        if (obtenerTipoMantenimientoErr) {
          console.error('Error al obtener tipo de mantenimiento:', obtenerTipoMantenimientoErr);
          return res.status(500).json({ error: 'Error interno del servidor.' });
        }

        // Verificar que haya resultados
        let idTipoMantenimiento;

        if (obtenerTipoMantenimientoResult && obtenerTipoMantenimientoResult.length > 0) {
          idTipoMantenimiento = obtenerTipoMantenimientoResult[0].id_mantenimiento;
        }

        // Insertar datos de la máquina en la tabla de ingresos con el serial como id_ingreso
        const insertarMaquinaQuery = 'INSERT INTO ingresos (id_ingreso, nombre_de_maquina, Marca_de_maquina, descripcion, fecha_ingreso, id_mantenimiento) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(insertarMaquinaQuery, [serial, nombreMaquina, marca, descripcion, fechaIngreso, idTipoMantenimiento], (insertarMaquinaErr, insertarMaquinaResult) => {
          if (insertarMaquinaErr) {
            console.error('Error al insertar máquina:', insertarMaquinaErr);
            return res.status(500).json({ error: 'Error interno del servidor.' });
          }

          console.log('Registro de máquina exitoso:', insertarMaquinaResult);
          return res.status(200).json({ success: 'Registro de máquina exitoso.' });
        });
      });
    });
  } else {
    console.log('Valor de tipoMantenimiento no permitido:', tipoMantenimiento);
    return res.status(400).json({ error: 'Valor de tipoMantenimiento no permitido.' });
  }
};