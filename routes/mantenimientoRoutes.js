// mantenimientoRoutes.js
const express = require('express');
const router = express.Router();
const mantenimientoController = require('./../controllers/mantenimientoController');

router.get('/mantenimiento', mantenimientoController.renderizarMantenimiento);
router.post('/finalizar', mantenimientoController.finalizarMantenimiento);
router.post('/mantenimiento/insumos', mantenimientoController.irAInsumosRepuestos);

module.exports = router;



