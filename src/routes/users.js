//Requiriendo express para obtener sus funcionalidades
const express = require('express');

//Ejecutando la funcionalidad de rutas de express
const router = express.Router();

//Requiriendo el controlador para obtener sus funcionalidades
const usersController = require('../controllers/usersController')

//Requiriendo Multer para enviar archivos desde un formulario
const uploadUsuario = require ('../middlewares/multerUsers');

//Requiriendo de login y logout
const guestMiddleware = require ('../middlewares/guestMiddleware');
const authMiddleware = require ('../middlewares/authMiddleware');

//Requiriendo las validaciones
const validacionRegister = require ('../middlewares/validacionRegister');

//Rutas (sin el prefijo definido en app.js)

router.get('/logout', usersController.logout);

router.get('/register', guestMiddleware, usersController.register);// add
router.post('/register', validacionRegister, usersController.processRegister);// create

router.get('/login', guestMiddleware, usersController.login);
router.post('/login', usersController.loginProcess);

router.get('/:id/edit', authMiddleware, usersController.userEdit);
router.put('/:id/edit', uploadUsuario.single('imagen'), usersController.userUpdate);

router.get('/logout', usersController.logout);

router.get('/:id/profile', usersController.profile);

//Exportando al router para que pueda ser usado por el entry point
module.exports = router;