const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresaController');

router.post('/registrar-empresa', empresaController.registrarEmpresa);

module.exports = router;
