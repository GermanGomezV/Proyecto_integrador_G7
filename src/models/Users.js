//Ejecutando la funcionalidad de path que resuelve rutas
const path = require('path');

//Requiriendo la funcionalidad fs
//fs convierte un objeto literal (el cual puede ser obtenido de un formulario) en un archivo JSON
const fs = require('fs');

//Objeto para manipular la base de datos
const Users = {
    
    filename: './database/users',

    //Trae todos los usuarios en formato objeto literal
    getData: () => {
        return JSON.parse(fs.readFileSync(this.filename, 'utf-8'));
    },

    //Trae todos los usuarios en formato objeto literal
    findAll : () => {
        return this.getData();
    },

    //Busca los usuarios por ID
    findByPk : (id) => {
        let allUsers = this.findAll();
        let userFound = allUsers.find(usuario => usuario.id === id);
    },

    //Trae elultimo usuario y le suma uno para agregarlo al proximo usuario a guardar
    generateId : () => {
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if (lastUser) {
            return lastUser.id + 1;
        }
        return 1;
    },

    //Busca por cualquiera campo dentro del archivo users (solo trae un usuario, para que traiga todo que hacerlo iterar)
    findByField : (field, text) => {
        let allUsers = this.findAll();
        let userFound = allUsers.find(usuario => usuario[field] === text);
        return userFound
    },

    //Crea el usuario y lo agrega en la base de datos
    create : (userData) => {
        let allUsers = this.findAll();
        let newUser = {
            id : this.generateId(),
            ...userData
        };
        allUsers.push(newUser);
        fs.writeFileSync(this.filename, JSON.stringify(allUsers, null, ' '));
        return newUser;
    },

    //Borra al usuario
    delete : (id) => {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(usuario => usuario.id !== id);
        fs.writeFileSync(this.filename, JSON.stringify(finalUsers, null, ' '));
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
        fs.writeFileSync(this.filename, JSON.stringify(allUsers, null, ' '));
        return newUser;
    }

}

module.exports = Users;