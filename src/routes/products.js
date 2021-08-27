//Requiriendo express para obtener sus funcionalidades
const express = require('express');

//Ejecutando la funcionalidad de rutas de express
const router = express.Router();

//Requiriendo el controlador para obtener sus funcionalidades
//El "../" sirve para ir una carpeta hacia atras
const productsController = require('../controllers/productsController');

//Requiriendo Multer para enviar archivos desde un formulario
const uploadProducto = require('../middlewares/multerProducts')

//Requiriendo las validaciones
const validacionesCharge = require('../middlewares/validacionCharge')
const validacionesEdit = require('../middlewares/validacionEdit')
const adminMiddleware = require ('../middlewares/adminUserMiddleware');

//Rutas (sin el prefijo definido en app.js)
//En el mismo defino la ruta relativa, el controlador y su metodo asociado
router.get('/list', productsController.productList);
router.get('/cart', productsController.productCart);
router.get('/detail/:id', productsController.productDetail);

router.get('/charge', adminMiddleware, productsController.productCharge);
router.post('/charge', uploadProducto.single('imagen'), adminMiddleware, validacionesCharge, productsController.store);

router.get('/:id/edit', adminMiddleware, productsController.productEdit);
router.put('/:id/edit', adminMiddleware, uploadProducto.single('imagen'), validacionesEdit, productsController.productUpdate);

router.post('/:id/delete', adminMiddleware, productsController.delete);

router.post('/productList', productsController.search);

//Exportando al router para que pueda ser usado por el entry point
module.exports = router;