//Requiriendo express para obtener sus funcionalidades
const express = require('express');

//Ejecutando la funcionalidad de rutas de express
const router = express.Router();

//Requiriendo el controlador para obtener sus funcionalidades
const mainController = require('../controllers/mainController');

//Rutas (sin el prefijo definido en app.js)
router.get('/', mainController.inicio);
router.get('/ayuda', mainController.ayuda);


//Exportando al router para que pueda ser usado por el entry point
module.exports = router;