//Ejecutando la funcionalidad de path que resuelve rutas
const path = require('path');

//Requiriendo la funcionalidad fs
//fs permite manipular al archivo JSON para trabajarlo en con JS
const fs = require('fs');

//Objeto con métodos para manipular la BD
const Users = {
    
    //BD de los usuarios registrados
    fileName: './database/users.json',

    //Lee el archivo JSON y lo convierte en un objeto literal
    //Luego, lo convierte en un array de objetos literales para trabajarlo con JS
    getData: () => {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },

    //Trae todos los usuarios en formato de array de objetos literales
    findAll: () => {
        return this.getData();
    },

    //Filtra los usuarios por ID y devuelve el objeto literal con el ID indicado
    findByPk: (id) => {
        let allUsers = this.findAll();
        let userFound = allUsers.find(usuario => usuario.id === id);
        return userFound;
    },

    //Filtra los usuarios por un texto, que puede ser un ID o un e-mail, buscando solamente en la propiedad (field) indicada.
    findByField: (field, text) => {
        let allUsers = this.findAll();
        let userFound = allUsers.find(usuario => usuario[field] === text);
        return userFound
    },
    
    //Trae el último usuario y le suma uno para agregarlo en la próxima posición del array
    generateId: () => {
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if (lastUser) {
            return lastUser.id + 1;
        }
        return 1;
    },

    //Crea el usuario y lo agrega en la BD
    create: (userData) => {
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        };
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
        return newUser;
    },

    //Borra al usuario
    delete: (id) => {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(usuario => usuario.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
        return true;
    },

    // Edita un usuario - Ver el codigo
    update: (id) => {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(usuario => usuario.id === id);
        let newUser = {
            ...userData
        };
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
        return newUser;
    }

}

module.exports = Users;