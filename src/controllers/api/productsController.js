const db = require ("../../database/models");
const { Op } = require("sequelize");
const Producto = require("../../database/models/Producto");

const productsController = {
    list: (req, res) => {
        db.Productos.findAll()
        .then(PRODUCTS => {
            const response = PRODUCTS.map(product => ({
                id: product.id_producto,
                name: product.nombre,
                description: product.descripcion, 
                detail: `${req.protocol}://${req.get('host')}/api/products/${product.id_producto}`
            }));
            return res.status(200).json({
                count: PRODUCTS.length,
                products: response
            })
        })
    },

    // Método SHOW para CONSULTAR el detalle de un producto (viaja por GET)
    show: (req, res) => {
        db.Productos
        .findByPk(req.params.id)
        .then(product => {
            console.log(product)
            const response = {
                id: product.id_producto,
                name: product.nombre,
                description: product.descripcion,
                price: product.precio,
                discount: product.descuento,
                category: product.id_categoria_FK,
                image: `${req.protocol}://${req.get('host')}/images/productos/${product.imagen}`
            };
            return res.status(200).json(
                response
            )
        })
    }
}

//Exportando al router para que pueda ser usado por el entry point
module.exports = productsController;