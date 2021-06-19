//Requiriendo de login y logout
const guestMiddleware = require ('../middlewares/guestMiddleware');
const authMiddleware = require ('../middlewares/authMiddleware');

//Requiriendo express para obtener sus funcionalidades
const express = require('express');

//Ejecutando la funcionalidad de rutas de express
const router = express.Router();

//Requiriendo el controlador para obtener sus funcionalidades
const usersController = require('../controllers/usersController')

//Requiriendo Multer para enviar archivos desde un formulario
const uploadUsuario = require ('../middlewares/multerUsers');

//Requiriendo las validaciones
const validacionesRegister = require('../middlewares/validacionRegister');


//Rutas (sin el prefijo definido en app.js)
router.get('/profile', authMiddleware, usersController.profile);
router.get('/logout', usersController.logout);

router.get('/register', guestMiddleware, usersController.register);
router.post('/register', validacionesRegister, usersController.create);

router.get('/login', guestMiddleware, usersController.login);

router.get('/:id/edit', usersController.userEdit);
router.put('/edit', uploadUsuario.single('imagen'), usersController.userUpdate);

//Exportando al router para que pueda ser usado por el entry point
module.exports = router;