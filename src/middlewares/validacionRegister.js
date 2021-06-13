//Ejecutando la funcionalidad de path que resuelve rutas
const path = require('path');

//Requiero Express validator
const { body } = require('express-validator');

//Creo el array con las validaciones
let validaciones = [
    body('nombre').notEmpty().withMessage('Tienes que escribir tu nombre'),
    body('apellido').notEmpty().withMessage('Tienes que escribir tu apellido'),
    body('email').notEmpty().withMessage('Tienes que escribir tu correo electronico').bail()
        .isEmail().withMessage('Debes escribir un correo electronico valido'),
    body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
    body('password2').notEmpty().withMessage('Tienes que repetir la contraseña'),
    body('recordarUsuario').notEmpty().withMessage('Tienes que aceptar los Términos y condiciones')
];

module.exports = validaciones;