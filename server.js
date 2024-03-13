const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use('/public', express.static(path.join(__dirname, 'public')));
// Middleware para procesar datos en formato JSON
app.use(express.json());

// Middleware para establecer el tipo de contenido para archivos JavaScript
app.use('*.js', (req, res, next) => {
  res.type('text/javascript');
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware CORS para permitir solicitudes desde cualquier origen
app.use(cors());

// Rutas de registro y login
const userController = require('./controllers/userController');
app.post('/registro', userController.registrarUsuario);
app.post('/login', userController.loginUsuario);

// Registro de empresa y registro de maquina
const empresaController = require('./controllers/empresaController');
app.post('/registrar-empresa', empresaController.registrarEmpresa);
app.use(bodyParser.json());
const empresasRoutes = require('./routes/empresaRoutes');
app.use('/empresas', empresasRoutes);

// Diagnóstico
app.use(bodyParser.json());
const diagnosticoRoutes = require('./routes/diagnosticoRoutes');
app.use('/diagnostico', diagnosticoRoutes);

// Generar Ticket
//app.use(bodyParser.json());
//const generarTicketRouter = require('./routes/generarTicketRouter');
//app.use('/api/generarTicket', generarTicketRouter);

// Rutas de enlace
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/registro.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.get('/registroDeEmpresa', (req, res) => {
  res.sendFile(__dirname + '/registroDeEmpresa.html');
});

app.get('/registro_de_maquina', (req, res) => {
  res.sendFile(__dirname + '/registro_de_maquina.html');
});

app.get('/diagnostico', (req, res) => {
  res.sendFile(__dirname + '/diagnostico.html');
});

app.get('/finalizacion', (req, res) => {
  res.sendFile(__dirname + '/finalizacion.html');
});

// Importa tu controlador o lógica para manejar el formulario
const generarTicketRouter = require('./routes/generarTicketRouter');

// Configura la ruta para manejar las solicitudes POST del formulario
app.use('/api/generarTicket', generarTicketRouter);

// Definir la función mostrarSerialMaquina antes de su uso
function mostrarSerialMaquina(callback) {
  db.query(
    'SELECT Serial_maquina FROM ingresos WHERE id_ingreso = (SELECT MAX(id_ingreso) FROM ingresos)',
    (error, results) => {
      if (error) {
        console.error(error);
        return callback(error, null);
      }

      const serialMaquina = results[0].Serial_maquina;
      callback(null, serialMaquina);
    }
  );
}

function obtenerCodigoTecnicoReciente() {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT documento FROM usuarios ORDER BY id_usuario DESC LIMIT 1',
      (error, results) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          const codigoTecnico = results.length > 0 ? results[0].documento : null;
          resolve(codigoTecnico);
        }
      }
    );
  });
}

app.route('/generacion_ticket')
  .get((req, res) => {
    mostrarSerialMaquina((error, serialMaquina) => {
      if (error) {
        console.error(error);
        return res.status(500).send('Error interno del servidor');
      }

      res.render('formulario', { serialMaquina, documento: null, numeroTicket: null });
    });
  })
  .post(async (req, res) => {
    try {
      // Lógica para obtener el código del técnico desde la base de datos
      const documento = await obtenerCodigoTecnicoReciente();

      // Lógica para generar el número de ticket
      const numeroTicket = generarNumeroTicket();
      console.log("Valor de documento:", documento);

      res.render('formulario', { serialMaquina: req.body.serialMaquina, documento, numeroTicket });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  });
app.get('/cerrar_ticket', (req, res) => {
  res.sendFile(__dirname + '/cerrar_ticket.html');
});

app.get('/historial_maquina', (req, res) => {
  res.sendFile(__dirname + '/historial_maquina.html');
});

app.get('/insumos_repuestos', (req, res) => {
  res.sendFile(__dirname + '/insumos_repuestos.html');
});

app.get('/mantenimiento', (req, res) => {
  res.sendFile(__dirname + '/mantenimiento.html');
});

// Middleware para manejar errores 404 (Not Found)
app.use((req, res, next) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Middleware para manejar errores globales
app.use((err, req, res, next) => {
  console.error('Error global:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});