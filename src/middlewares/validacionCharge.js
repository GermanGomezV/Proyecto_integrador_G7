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
    body('imagen').custom((value, { req }) => {
        let file = req.file;
        let acceptedExt = ['.jpg', '.PNG'];
        if (!file){
            throw new Error('Tienes que subir una imagen del producto');
        } else {
            let fileExt = path.extname(file.originalname);
            if(!acceptedExt.includes(fileExt)){
                throw new Error(`Las extensiones para imagenes permitidas son ${acceptedExt.join(', ')}`);
            }
        }
        return true;
    }),
    body('categoria').notEmpty().withMessage('Tienes que seleccionar la categoria del producto')
];

module.exports = validaciones;