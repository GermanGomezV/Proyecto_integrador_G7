//Requiriendo la funcionalidad path que resuelve rutas
const path = require ('path');

//Requieriendo la base de datos
let db = require('../database/models')
const { Op } = require("sequelize");

let apisController = {

    usersList: (req, res) => {
        db.Usuarios.findAll()
            .then(users => {
                return res.status(200).json({
                    count: users.length,
                    users: users.map(function(user) {
                        return {
                            id: user.id_usuario,
                            name: user.nombre,
                            lastName: user.apellido,
                            email: user.correo,
                            detail: `http://localhost:3001/api/users/${user.id_usuario}`
                        }
                    })
                })
            })
            .catch(error => console.log(error))
    },

    usersDetail: (req, res) => {
        db.Usuarios.findByPk(req.params.id) 
            .then(user => {
                    return res.status(200).json({
                    id: user.id_usuario,
                    name: user.nombre,
                    lastName: user.apellido,
                    email: user.correo,
                    avatar: `http://localhost:3001/images/usuarios/${user.imagen}`
                })
            })
            .catch(error => console.log(error))
    },

    productsList: (req, res) => {
        db.Productos.findAll()
            .then(products => {
                let cantidadBebidas = []
                let cantidadPrevia = []
                for (let i=0; i<products.length; i++) {
                    switch(products[i].id_categoria_FK) {
                        case 1: cantidadBebidas.push("Bebidas")
                        break
                        case 2: cantidadPrevia.push("Previa")
                        break
                    }
                } 
                return res.status(200).json({
                    count: products.length,
                    countByCategory: {
                        Bebidas: cantidadBebidas.length,
                        Previa: cantidadPrevia.length,
                    },
                    products: products.map(function(product) {
                        switch (product.id_categoria_FK) {
                            case 1: product.id_categoria_FK = "Bebidas"
                            break
                            case 2: product.id_categoria_FK= "Previa"
                            break
                        }
                        return {
                            id: product.id_producto,
                            name: product.nombre,
                            description: product.descripcion,
                            category: product.id_categoria_FK,
                            price: product.precio,
                            imagen: `http://localhost:3001/images/productos/${product.imagen}`,
                            detail: `http://localhost:3001/products/detail/${product.id_producto}`
                        }
                    })
                })
            })
            .catch(error => console.log(error))
    },

    productsDetail: (req, res) => {
        db.Productos.findByPk(req.params.id) 
            .then(product => {
                switch (product.id_categoria_FK) {
                    case 1: product.id_categoria_FK = "Bebidas"
                    break
                    case 2: product.id_categoria_FK= "Previa"
                    break
                }
                return res.status(200).json({
                    id: product.id_producto,
                    nombre: product.nombre,
                    descripcion: product.descripcion,
                    imagen: `http://localhost:3001/images/productos/${product.imagen}`,
                    precio: product.precio,
                    descuento: product.descuento,
                    category: product.id_categoria_FK
                })
            })
            .catch(error => console.log(error))        
    },

    categoriesList: (req, res) => {
        db.Categorias.findAll()
            .then(users => {
                return res.status(200).json({
                    count: users.length,
                    users: users.map(function(category) {
                        return {
                            id: category.id_categoria,
                            name: category.nombre,
                            detail: `http://localhost:3001/api/categories/${category.id_categoria}`
                        }
                    })
                })
            })
            .catch(error => console.log(error))
    },
}

module.exports = apisController