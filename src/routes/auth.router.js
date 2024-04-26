const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();

// Rutas
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);
router.get('/logout', authController.logout);

module.exports = router;
