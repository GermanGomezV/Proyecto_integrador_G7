//Requiriendo express para obtener sus funcionalidades
const express = require('express');

//Ejecutando la funcionalidad de rutas de express
const router = express.Router();

//API de Usuarios
//Requiriendo el controlador para obtener sus funcionalidades
const usersController = require('../controllers/api/usersController')

//Rutas (sin el prefijo /api definido en app.js)
router.get('/users', usersController.list);
router.get('/users/:id', usersController.show);

//API de Productos
//Requiriendo el controlador para obtener sus funcionalidades
const productsController = require('../controllers/api/productsController')

//Rutas (sin el prefijo /api definido en app.js)
router.get('/products', productsController.list);
router.get('/products/:id', productsController.show);

//API de Categorias
//Requiriendo el controlador para obtener sus funcionalidades
const categoryController = require('../controllers/api/categoriesController')

//Rutas (sin el prefijo /api definido en app.js)
router.get('/categories', categoryController.list);
router.get('/categories/:id', categoryController.show);

//Exportando al router para que pueda ser usado por el entry point
module.exports = router;