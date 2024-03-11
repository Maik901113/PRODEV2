// routesDiagnostico.js
const express = require('express');
const router = express.Router();
const diagnosticoController = require('../controllers/diagnosticoController');

// Utiliza router.post para manejar solicitudes POST a la ruta /registrar-diagnostico
router.post('/registrar-diagnostico', diagnosticoController.registrarDiagnostico);

module.exports = router;

