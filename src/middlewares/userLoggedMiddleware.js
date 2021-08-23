//Requiriendo el modelo User
//const User = require('../models/Users')

//Requieriendo la base de datos
let db = require('../database/models')
const { Op } = require("sequelize");

function userLoggedMiddleware (req, res, next) {
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail;
    //let userFromCookie = User.findByField('email', emailInCookie);

    db.Usuarios.findOne({
        where : {
            correo : {
                [Op.like] : `%${emailInCookie}%`
            }
        }
    })
    .then(userFromCookie => {
        
            if(userFromCookie){
                req.session.userLogged = userFromCookie;
            }
            
            if(req.session && req.session.userLogged) { 
                res.locals.isLogged = true;
                res.locals.userLogged = req.session.userLogged;
            }
        
            next();
    })
    .catch(error => {
        console.log(error)
    })
};

module.exports = userLoggedMiddleware;