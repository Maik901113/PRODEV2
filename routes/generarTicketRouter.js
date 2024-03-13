// generarTicketRouter.js
const express = require('express');
const router = express.Router();
const generarTicketController = require('../controllers/generarTicketControllers');

// Ruta para generar el ticket
router.post('/', generarTicketController.generarTicket);

module.exports = router;
