
const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresaController');

router.post('/registrar-empresa', empresaController.registrarEmpresa);
router.post('/registrar-maquina', empresaController.registrarMaquina);
router.post('/registrar-mantenimiento', empresaController.registrarMantenimiento);

module.exports = router;
