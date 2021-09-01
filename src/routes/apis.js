//Requiriendo express para obtener sus funcionalidades
const express = require ('express');

//Ejecutando la funcionalidad de rutas de express
const router = express.Router();

//Requiriendo el controlador para obtener sus funcionalidades
let apisController = require ('../controllers/apisController')

//Rutas (sin el prefijo definido en app.js)
router.get('/users', apisController.usersList)
router.get('/users/:id', apisController.usersDetail)
router.get('/products', apisController.productsList)
router.get('/products/:id', apisController.productsDetail)

//Exportando al router para que pueda ser usado por el entry point
module.exports = router