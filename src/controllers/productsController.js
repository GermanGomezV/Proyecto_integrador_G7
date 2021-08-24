//Requiriendo la funcionalidad path que resuelve rutas
const path = require('path');

//Requieriendo la base de datos
let db = require('../database/models')
const { Op } = require("sequelize");

//Requiriendo la funcionalidad fs
//fs convierte un objeto literal (el cual puede ser obtenido de un formulario) en un archivo JSON
const fs = require('fs');

//Requiriendo el metodo validation Result
const { validationResult } = require('express-validator');


// BORRAR
//Requerir la funcionalidad para leer y leer/actualizar el archivo .json 
// const {readJson, writeJson, newId} = require('./helpers');

//arrays de productos por categoria
// const productos = readJson('products.json');
// const productosBebida = productos.filter (producto => producto.categoria == 'Bebida');
// const productosAsado = productos.filter (producto => producto.categoria == 'Asado');
// const productosPicada = productos.filter (producto => producto.categoria == 'Picada');

//Definiendo la logica del controlador: Renderizando vistas EJS
//El controlador está compuesto por un objeto literal que a su vez compuesto por métodos (funciones o callbacks)
const productsController = {
    
    productList : (req, res) => {
        db.Productos.findAll()
        .then(producto => {
            res.render("products/productList", {producto})
        })
        .catch(error => {
            console.log(error)
        })
    },
    
    productCart : (req, res) => {
        res.render('products/productCart');
    },

    productDetail : (req, res) => {

        //productos totales
        let pt = db.Productos.findAll()
        //producto
        let p = db.Productos.findByPk(req.params.id)
        Promise
        .all([p, pt])
        .then(([p, pt]) => {
            res.render('products/productDetail', {p, pt})
        })
        .catch(error => {
            console.log(error)
        })
    },
    productCharge : (req, res) => {
        db.Categorias.findAll()
        .then (categorias => {
            return res.render('products/productCharge',{categorias});
        })
        .catch(error => {
            console.log(error)
        })
    },
    store: (req, res) => {

        const resultValidation = validationResult(req)

        if (resultValidation.errors.length > 0){
            return res.render('products/productCharge', {
                errors: resultValidation.mapped(),
                oldData: req.body,
            });
        };

        db.Productos.create({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            descuento: req.body.descuento,
            id_categoria_FK: req.body.categoria,
            imagen: req.file.filename
        })
        .catch(error => {
            console.log(error)
        })

        return res.redirect('/');

    },
    productEdit : (req, res) => {

        const resultValidation = validationResult(req)

        if (resultValidation.errors.length > 0){
            return res.render('products/productEdit', {
                errors: resultValidation.mapped(),
                oldData: req.body,
            });
        };

        db.Categorias.findAll()
        .then (categorias => {
            return categorias
        })
        .catch(error => {
            console.log(error)
        })

        //Nota: De todos los productos, vamos a editar el sumistrado como parametro de la URL
        let idProduct = req.params.id;
        db.Productos.findByPk(idProduct, {
            include: [{association: 'categorias'}]
            })
            .then(producto => {
                res.render('products/productEdit', {producto, categorias})
            })
            .catch(error => {
                console.log(error)
            })
    },

    productUpdate : (req, res) => {

        let idProduct = req.params.id;
        if(req.file) {
            db.Productos.update({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precio: req.body.precio,
                descuento: parseInt(req.body.descuento),
                imagen: req.file.filename,
                id_categoria_FK: req.body.categoria_id
            },
            {
                where: {
                    id_producto: idProduct
                }
            },
            {
                include: [{association:'categorias'}]
            })
            .catch(error => {
                console.log(error)
            })
              return res.redirect('/');
        }else{
            db.Productos.update({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precio: req.body.precio,
                descuento: parseInt(req.body.descuento),
                id_categoria_FK: req.body.categoria_id
            },
            {
                where: {
                    id_producto: idProduct
                }
            },
            {
                include: [{association:'categorias'}]
            })
            .catch(error => {
                console.log(error)
            })
            return res.redirect('/');          
        }
    },
    delete : (req, res) => {
        db.Productos.destroy({
            where : {
                id_producto : req.params.id
            }
        })
        .catch(error => {
            console.log(error)
        })
        res.redirect('/');
    },
    search : (req, res) => {

        //productos totales
        let pt = db.Productos.findAll()

        //productos buscados
        let p = db.Productos.findAll({
            where : {
                nombre : {
                    [Op.like] : `%${req.body.busqueda}%`
                }
            }
        })
        Promise
        all([pt, p])
        .then(([pt, p]) => {
            res.render("products/productList", {pt, p})
        })
        .catch(error => {
            console.log(error)
        })
    },

};

//Exportando al controlador para que pueda ser usado por la ruta.
module.exports = productsController;