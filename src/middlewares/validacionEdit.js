//Ejecutando la funcionalidad de path que resuelve rutas
const path = require('path');

//Requiero Express validator
const { body } = require('express-validator');

//Creo el array con las validaciones
let validaciones = [
    body('nombre').notEmpty().withMessage('Tienes que escribir el nombre del producto'),
    body('descripcion').notEmpty().withMessage('Tienes que escribir una descripccion del producto'),
    body('precio').notEmpty().withMessage('Tienes que establecer un precio de venta'),
    body('descuento').notEmpty().withMessage('Tienes que establecer un descuento de venta'),
    body('categoria').notEmpty().withMessage('Tienes que seleccionar la categoria del producto')
];

module.exports = validaciones;