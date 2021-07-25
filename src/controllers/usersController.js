//Requiriendo la funcionalidad fyle sinc que resuelve rutas
const fs = require('fs');

let db = require('../../database/models')

//Requiriendo la funcionalidad de read y write json
const {readJson, writeJson, newId} = require('./helpers');

//Requiriendo bcryptjs
const bcrypt = require('bcryptjs');

//Requiriendo el metodo validation Result
const { validationResult } = require('express-validator');

//Requiriendo el modelo User
const User = require('../models/Users')

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

        let userInDb = User.findByField('email', req.body.email)

        if(userInDb){
            return res.render('users/register', {
                errors: {
                    email : {
                        msg : 'Este email ya esta registrado'
                    }
                },
                oldData: req.body
            });
        };
        let usuario = {
            nombre: req.body.nombre,
            apellido:req.body.apellido,
            correo: req.body.email,
            contrasena: bcrypt.hashSync(req.body.password, 10)
        };

        db.Usuarios.create(usuario);
        return res.redirect('/');
    },

    //Eliminar esto??? No esta en los controladores
    store : (req, res) => {
        if(req.file){
            let archivosUsusarios = readJson('users.json');
            let usuario = {
                id : newId('users.json'),
                imagen: req.file.filename,
                nombre: req.body.nombre,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                direccion : req.body.direccion,
                telefono : req.body.telefono,
                nacimiento : req.body.nacimiento
            };
            archivosUsusarios.push(usuario);
            writeJson('users.json', archivosUsusarios);
            return res.redirect('/')
        }else{
            res.render('users/edit')
        }
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
        let userToLogin = User.findByField('email', req.body.email);

        if(userToLogin){
            let correctPassword = bcrypt.compareSync(req.body.password, userToLogin.password);
            if(correctPassword){
                delete correctPassword.password;
                req.session.userLogged = userToLogin;
                
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
        };

        return res.render('users/login', {
            errors: {
                email : {
                    msg : 'No se encuentra este email en nuestra base de datos'
                }
            }
        })
    },
    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect("/");
    }
};

//Exportando al router para que pueda ser usado por el entry point
module.exports = usersController;