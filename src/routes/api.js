//Requiriendo express para obtener sus funcionalidades
const express = require('express');

//Ejecutando la funcionalidad de rutas de express
const router = express.Router();

//Requiriendo el controlador para obtener sus funcionalidades
const usersController = require('../controllers/api/usersController')

router.get('/users', usersController.list);
router.get('/users/:id', usersController.show);

//Exportando al router para que pueda ser usado por el entry point
module.exports = router;