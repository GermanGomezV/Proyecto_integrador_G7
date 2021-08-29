const db = require ("../../database/models");
const { Op } = require("sequelize");
const Categoria = require("../../database/models/Categoria");

const categoriesController = {
    list: (req, res) => {
        db.Categorias.findAll()
        .then(CATEGORY => {
            const response = CATEGORY.map(category => ({
                id: category.id_categoria,
                name: category.nombre,
                detail: `${req.protocol}://${req.get('host')}/api/categories/${category.id_categoria}`
            }));
            return res.status(200).json({
                count: CATEGORY.length,
                categories: response
            })
        })
    },

    // Método SHOW para CONSULTAR el detalle de una categoria (viaja por GET)
    show: (req, res) => {
        db.Categorias
        .findByPk(req.params.id)
        .then(category => {
            const response = {
                id: category.id_categoria,
                name: category.nombre,
            };
            return res.status(200).json(
                response
            )
        })
    }
}

//Exportando al router para que pueda ser usado por el entry point
module.exports = categoriesController;