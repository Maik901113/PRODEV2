const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/registro', userController.registrarUsuario);
router.post('/login', userController.loginUsuario);

module.exports = router;
