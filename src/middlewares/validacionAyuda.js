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
    body('descripcion').notEmpty().withMessage('Tienes que escribir tu mensaje')
];

module.exports = validaciones;