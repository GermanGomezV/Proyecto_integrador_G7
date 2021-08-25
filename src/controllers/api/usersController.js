const db = require ("../../database/models");
const { Op } = require("sequelize");
const Usuario = require("../../database/models/Usuario");

const usersController = {
    list: (req, res) => {
        db.Usuarios.findAll()
        .then(USERS => {
            const response = USERS.map(user => ({
                id: user.id_usuario,
                name: user.nombre,
                email: user.correo, 
                detail: `${req.protocol}://${req.get('host')}/api/users/${user.id_usuario}`
            }));
            return res.status(200).json({
                count: USERS.length,
                users: response
            })
        })
    },

    // Método SHOW para CONSULTAR el detalle de un USUARIO (viaja por GET)
    show: (req, res) => {
        db.Usuarios
        .findByPk(req.params.id)
        .then(user => {
            console.log(user)
            const response = {
                id: user.id_usuario,
                name: user.nombre,
                last_name: user.apellido,
                email: user.correo,
                address: user.direccion,
                phone: user.telefono,
                birth_date: user.fecha_nacimiento,
                image: `${req.protocol}://${req.get('host')}/images/usuarios/${user.imagen}`
            };
            return res.status(200).json(
                response
            )
        })
    }
}

//Exportando al router para que pueda ser usado por el entry point
module.exports = usersController;