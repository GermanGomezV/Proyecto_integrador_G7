//Requieriendo la base de datos
let db = require('../../database/models')

//Definiendo la logica del controlador: Renderizando vistas EJS
//El controlador está compuesto por un objeto literal que a su vez compuesto por métodos (funciones o callbacks)
const mainController = {
    inicio : (req, res) => {
        db.Productos.findAll()
            .then(function(producto){
                return res.render('main/index', { producto });
            })
    }
};

//Exportando al router para que pueda ser usado por el entry point
module.exports = mainController;