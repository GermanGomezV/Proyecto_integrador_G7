//Requiriendo la funcionalidad fyle sinc que resuelve rutas
const fs = require('fs');

let db = require('../database/models')
const { Op } = require("sequelize");

//Requiriendo la funcionalidad de read y write json
const {readJson, writeJson, newId} = require('./helpers');

//Requiriendo bcryptjs
const bcrypt = require('bcryptjs');

//Requiriendo el metodo validation Result
const { validationResult } = require('express-validator');

//Requiriendo el modelo User
const User = require('../models/Users');
const { parse } = require('path');

//Definiendo la logica del controlador: Renderizando vistas EJS
//El controlador está compuesto por un objeto literal que a su vez compuesto por métodos (funciones o callbacks)
const usersController = {
    //add
    register : (req, res) => {
        res.render('users/register');
    },
    login : (req, res) => {
        res.render('users/login');
    },
    processRegister : (req, res) => {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0){
            return res.render('users/register', {
                errors: resultValidation.mapped(),
                oldData: req.body,
            });
        };

        db.Usuarios.findAll({
            where : {
                correo : {
                    [Op.like] : `%${req.body.email}%`
                }
            }
        })
        .then(usuario => {
            if(usuario){
                return res.render('users/register', {
                    errors: {
                        email : {
                            msg : 'Este email ya esta registrado'
                        }
                    },
                    oldData: req.body
                });
            };
        })

        db.Usuarios.create({
            nombre: req.body.nombre,
            apellido:req.body.apellido,
            correo: req.body.email,
            contrasena: bcrypt.hashSync(req.body.password, 10),
            imagen: "default.jpg"
        })

        return res.redirect('/');
    },
    userEdit : (req, res) => {
        let idUser = req.params.id;
        db.Usuarios.findByPk(idUser)
            .then(usuario => {
                res.render('users/edit', {usuario: usuario})
            })
         },
    userUpdate : (req, res) => {
        let idUser = req.params.id;
        if(req.file) {
            db.Usuarios.update({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                telefono: req.body.telefono,
                direccion: req.body.direccion,
                correo: req.body.email,
                fechaNacimiento: req.body.nacimiento,
                contrasena: bcrypt.hashSync(req.body.password, 10),
                imagen: req.file.filename,
            },
            {
                where: {
                    id_usuario: idUser
                }
            })
              return res.redirect('/');
        }else{
            db.Usuarios.update({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                telefono: req.body.telefono,
                direccion: req.body.direccion,
                correo: req.body.email,
                fechaNacimiento: req.body.nacimiento,
                contrasena: bcrypt.hashSync(req.body.password, 10)
            },
            {
                where: {
                    id_usuario: idUser
                }
            })
            return res.redirect('/');          
        }        
    },
    loginProcess : (req, res) => {
        db.Usuarios.findOne({
            where : {
                correo : {
                    [Op.like] : `%${req.body.email}%`
                }
            }
        })
        .then(usuario => {
            if(usuario){
                let correctPassword = bcrypt.compareSync(req.body.password, usuario.contrasena);
                if(correctPassword){
                    delete correctPassword.password;
                    req.session.userLogged = usuario;
                    
                    if(req.body.recordarUsuario){
                        res.cookie('userEmail', req.body.email, {maxAge : (1000 * 60) * 60})
                    }
    
                    return res.redirect('/')
                };
                return res.render('users/login', {
                    errors: {
                        password : {
                            msg : 'Usuario o contraseña incorrectos'
                        }
                    },
                    oldData: req.body
                });
            }else{
                return res.render('users/login', {
                    errors: {
                        email : {
                            msg : 'No se encuentra este email en nuestra base de datos'
                        }
                    }
                })
            }
        })
    },
    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect("/");
    },
    profile: (req, res) => {
        db.Usuarios.findAll()
        .then(usuarios=> {
            return usuarios
        })
        db.Usuarios.findByPk(req.params.id)
        .then(usuario =>{
            res.render("users/profile", {usuario:usuario})
        })
    }

};

//Exportando al router para que pueda ser usado por el entry point
module.exports = usersController;