
const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresaController');

router.post('/registrar-empresa', empresaController.registrarEmpresa);
//router.post('/registrar-maquina', empresaController.registrarMaquina);

module.exports = router;
