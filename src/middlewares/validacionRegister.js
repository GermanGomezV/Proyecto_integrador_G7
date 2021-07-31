//Ejecutando la funcionalidad de path que resuelve rutas
const path = require('path');

//Validacion Backend - Requiriendo el metodo body de express-validator
const { body } = require('express-validator');

//Creo el array con las validaciones
//Indicamos que campo del req.body queremos chequear y que es lo que queremos chequear
//En caso de cumplirse la condición, dejamos un mensaje indicando cual es el error
let validaciones = [
    body('nombre').notEmpty().withMessage('Tienes que escribir tu nombre'),
    body('apellido').notEmpty().withMessage('Tienes que escribir tu apellido'),
    body('email').notEmpty().withMessage('Tienes que escribir tu correo electronico').bail()
        .isEmail().withMessage('Debes escribir un correo electronico valido'),
    body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
    body('password2').notEmpty().withMessage('Tienes que repetir la contraseña'),
    body('recordarUsuario').notEmpty().withMessage('Tienes que aceptar los Términos y condiciones'),
    body('password2').custom((value, { req }) => {
            if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden');
        }
        return true
    })
];

module.exports = validaciones;