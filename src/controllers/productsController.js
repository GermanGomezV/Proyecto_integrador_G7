//Requiriendo la funcionalidad path que resuelve rutas
const path = require('path');

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
        res.render('products/productlist',{
        productosBebida,
        productosAsado,
        productosPicada
        });
    },
    productCart : (req, res) => {
        res.render('products/productCart');
    },
    productDetail : (req, res) => {
        let idProduct = req.params.id;
        let archivoProductos = readJson('products.json');

        let idProductDetail = archivoProductos.filter ( (product) => { 
            return product.id == idProduct
        });
        
        res.render('products/productDetail', { idProductDetail: idProductDetail, archivoProductos : archivoProductos });
    },
    productCharge : (req, res) => {
        res.render('products/productCharge');
    },
    store: (req, res) => {

        const resultValidation = validationResult(req)

        if (resultValidation.errors.length > 0){
            return res.render('products/productCharge', {
                errors: resultValidation.mapped(),
                oldData: req.body,
            });
        };

        if(req.file) {
            let archivoProductos = readJson('products.json');
    
            let producto = {
                id : newId('products.json'),
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precio: req.body.precio,
                descuento: parseInt(req.body.descuento),
                categoria: req.body.categoria,
                imagen: req.file.filename
                // origen: req.body.origin,
                // volumen: req.body.volumen,
                // marca: req.body.marca,
            };
            archivoProductos.push(producto);
            writeJson('products.json', archivoProductos);
    
            return res.redirect('/');
        }else{
            res.render('products/productCharge');
        }
    },
    productEdit : (req, res) => {
        //Nota: De todos los productos, vamos a editar el sumistrado como parametro de la URL
        let idProduct = req.params.id;

        //Nota: El archivo products.json ya fue leido gracias al helper 
        let archivoProductos = readJson('products.json');
        
        //Crear una variable que filtre y luego envío está variable a la vista
        let idProductToEdit = archivoProductos.filter ( (product) => { 
            return product.id == idProduct
        });

        res.render('products/productEdit',
        {idProductToEdit: idProductToEdit });
    
    },
    productUpdate : (req, res) => {
        let idProduct = req.params.id;
        let archivoProductos = readJson('products.json');

        if(req.file) {
            let producto = {
                id : parseInt(req.body.id),
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precio: req.body.precio,
                descuento: parseInt(req.body.descuento),
                categoria: req.body.categoria,
                imagen: req.file.filename,
                origen: req.body.origin,
                volumen: req.body.volumen,
                marca: req.body.marca,
            }
            
            for(i in archivoProductos ){
                if(archivoProductos[i].id == idProduct){
                    archivoProductos.splice(i,1)
                }
            }

            archivoProductos.push(producto);
            writeJson('products.json', archivoProductos);
    
            return res.redirect('/');
        }else{
            let imagen;

            for(i in archivoProductos ){
                if(archivoProductos[i].id == idProduct){
                    imagen = archivoProductos[i].imagen
                    archivoProductos.splice(i,1)
                }
            }

            let producto = {
                id : parseInt(req.body.id),
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precio: req.body.precio,
                descuento: parseInt(req.body.descuento),
                categoria: req.body.categoria,
                imagen: imagen,
                origen: req.body.origin,
                volumen: req.body.volumen,
                marca: req.body.marca,
            };
            
            archivoProductos.push(producto);
            writeJson('products.json', archivoProductos);
    
            return res.redirect('/');
           
        }
        
    },
    destroy : (req, res) => {
		let nuevaBase = productos.filter (producto => producto.id != req.params.id);
		writeJson ('products.json', nuevaBase)
		res.redirect('/');
	}
};

//Exportando al controlador para que pueda ser usado por la ruta.
module.exports = productsController;