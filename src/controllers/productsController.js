//Requiriendo la funcionalidad path que resuelve rutas
const path = require('path');

let db = require('../../database/models')
const { Op } = require("sequelize");

//Requiriendo la funcionalidad fs
//fs convierte un objeto literal (el cual puede ser obtenido de un formulario) en un archivo JSON
const fs = require('fs');

//Requiriendo el metodo validation Result
const { validationResult } = require('express-validator')

//Requerir la funcionalidad para leer y leer/actualizar el archivo .json 
const {readJson, writeJson, newId} = require('./helpers');

//arrays de productos por categoria
const productos = readJson('products.json');
const productosBebida = productos.filter (producto => producto.categoria == 'Bebida');
const productosAsado = productos.filter (producto => producto.categoria == 'Asado');
const productosPicada = productos.filter (producto => producto.categoria == 'Picada');

//Definiendo la logica del controlador: Renderizando vistas EJS
//El controlador está compuesto por un objeto literal que a su vez compuesto por métodos (funciones o callbacks)
const productsController = {
    
    productList : (req, res) => {
        db.Productos.findAll()
        .then(function(producto){
            res.render("products/productList", {producto:producto})
        })
    },
    productCart : (req, res) => {
        res.render('products/productCart');
    },
    productDetail : (req, res) => {
        db.Productos.findAll()
            .then(productos => {
                return productos
            })

        db.Productos.findByPk(req.params.id)
            .then(producto => {
                res.render('products/productDetail', {producto, productos})
            })
    },
    productCharge : (req, res) => {
        db.Categorias.findAll()
        .then (function(categorias){
            return res.render('products/productCharge',{categorias:categorias});
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

        return res.redirect('/');

    },
    productEdit : (req, res) => {
        //Nota: De todos los productos, vamos a editar el sumistrado como parametro de la URL
        let idProduct = req.params.id;
        db.Productos.findByPk(idProduct, {
            include: [{association: 'categorias'}]
        })
            .then(producto => {
                res.render('products/productEdit', {producto: producto})
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
            return res.redirect('/');          
        }
        
    },
    delete : (req, res) => {
        db.Productos.destroy({
            where : {
                id_producto : req.params.id
            }
        })
        res.redirect('/');
    },
    search : (req, res) => {

        db.Productos.findAll()
        .then(productos => {
            return productos
        })

        db.Productos.findAll({
            where : {
                nombre : {
                    [Op.like] : `%${req.body.busqueda}%`
                }
            }
        })
        .then((producto) => {
            res.render("products/productList", {producto, productos})
        })
    },

};

//Exportando al controlador para que pueda ser usado por la ruta.
module.exports = productsController;