//Requiriendo la funcionalidad fyle sinc que resuelve rutas
const fs = require('fs');

//Requiriendo la funcionalidad de read y write json
const {readJson, writeJson, newId} = require('./helpers');

//Requiriendo bcryptjs
const bcrypt = require('bcryptjs');

//Validacion Backend - Requiriendo el metodo validationResult
const { validationResult } = require('express-validator');

//Requiriendo el modelo User
const User = require('../models/Users')

//Definiendo la logica del controlador: Renderizando vistas EJS
//El controlador está compuesto por un objeto literal que a su vez compuesto por métodos (funciones o callbacks)
const usersController = {
    register : (req, res) => {
        res.render('users/register');
    },
    login : (req, res) => {
        res.render('users/login');
    },

    //Antes se llamaba create
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
            id : newId('users.json'),
            nombre: req.body.nombre,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            imagen: "",
            direccion: "",
            telefono: "",
            nacimiento: ""
        };

        User.create(usuario);

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
        
        //Nota: De todos los usuarios, vamos a editar el sumistrado como parametro de la URL
        let idUsuario = req.params.id

        //Nota: El archivo users.json ya fue leido gracias al helper 
        let archivoUsuarios = readJson('users.json');
        
        //Crear una variable que filtre y luego envío está variable a la vista
        let idUsuarioToEdit = archivoUsuarios.filter( (usuario) => { 
            return usuario.id == idUsuario
        });
        res.render('users/edit',
        { idUsuarioToEdit });

    },

    userUpdate : (req, res) => {
        let idUser = req.params.id;
        let archivoUsuarios = readJson('users.json');

        if(req.file) {
            let usuario = {
                id : parseInt(req.body.id),
                imagen: req.file.filename,
                nombre: req.body.nombre,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                direccion : req.body.direccion,
                telefono : req.body.telefono,
                nacimiento : req.body.nacimiento
            }
            
            for(i in archivoUsuarios ){
                if(archivoUsuarios[i].id == idUser){
                    archivoUsuarios.splice(i,1)
                }
            }

            archivoUsuarios.push(usuario);
            writeJson('users.json', archivoUsuarios);
    
            return res.redirect('/');
        }else{
            let imagen;

            for(i in archivoUsuarios ){
                if(archivoUsuarios[i].id == idUser){
                    imagen = archivoUsuarios[i].imagen
                    archivoUsuarios.splice(i,1)
                }
            }

            let usuario = {
                id : parseInt(req.body.id),
                imagen: imagen,
                nombre: req.body.nombre,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                direccion : req.body.direccion,
                telefono : req.body.telefono,
                nacimiento : req.body.nacimiento
            }
            
            archivoUsuarios.push(usuario);
            writeJson('users.json', archivoUsuarios);
    
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