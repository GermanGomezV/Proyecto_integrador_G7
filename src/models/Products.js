//Ejecutando la funcionalidad de path que resuelve rutas
const path = require('path');

//Requiriendo la funcionalidad fs
//fs permite manipular al archivo JSON para trabajarlo en con JS
const fs = require('fs');

//Objeto con métodos para manipular la BD
const Products = {
    
    //BD de los products registrados
    fileName: './database/products.json',

    //Lee el archivo JSON y lo convierte en un objeto literal
    //Luego, lo convierte en un array de objetos literales para trabajarlo con JS
    getData: function () {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },

    //Trae todos los products en formato de array de objetos literales
    findAll: function () {
        return this.getData();
    },

    //Filtra los products por ID y devuelve el objeto literal con el ID indicado
    findByPk: function (id) {
        let allProducts = this.findAll();
        let productFound = allProducts.find(product => product.id === id);
        return productFound;
    },

    //Filtra los products por un texto, que puede ser un ID o un e-mail, buscando solamente en la propiedad (field) indicada.
    findByField: function (field, text) {
        let allProducts = this.findAll();
        let productFound = allProducts.find(product => product[field] === text);
        return productFound
    },
    
    //Trae el último product y le suma uno para agregarlo en la próxima posición del array
    generateId: function () {
        let allProducts = this.findAll();
        let lastUser = allProducts.pop();
        if (lastUser) {
            return lastUser.id + 1;
        }
        return 1;
    },

    //Crea el product y lo agrega en la BD
    create: function (userData) {
        let allProducts = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        };
        allProducts.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allProducts, null, ' '));
        return newUser;
    },

    //Borra al product
    delete: function (id) {
        let allProducts = this.findAll();
        let finalUsers = allProducts.filter(product => product.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
        return true;
    },

    // Edita un product - Ver el codigo
    update: function (id) {
        let allProducts = this.findAll();
        let finalUsers = allProducts.filter(product => product.id === id);
        let newUser = {
            ...userData
        };
        allProducts.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allProducts, null, ' '));
        return newUser;
    }

}

module.exports = Products;