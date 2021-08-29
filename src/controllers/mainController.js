//Requieriendo la base de datos
let db = require('../database/models')

//Validacion Backend - Requiriendo el metodo validationResult
const { validationResult } = require('express-validator');

//Definiendo la logica del controlador: Renderizando vistas EJS
//El controlador está compuesto por un objeto literal que a su vez compuesto por métodos (funciones o callbacks)
const mainController = {
    inicio : (req, res) => {
        db.Productos.findAll()
            .then(function(pt){
                return res.render('main/index', { pt });
            })
            .catch(error => {
                console.log(error)
            })
    },
    ayuda: (req, res) => {
        return res.render('main/ayuda')
    },
    envioAyuda: (req, res) => {

        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0){
            return res.render('main/ayuda', {
                errors: resultValidation.mapped(),
                oldData: req.body,
            });
        }else{
            return res.render('main/res_ayuda')
        }
    },
    dashboard: (req, res) => {
        res.redirect('http://localhost:3000/')
    }
};

//Exportando al router para que pueda ser usado por el entry point
module.exports = mainController;