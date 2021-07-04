//Modelo de la tabla Usuarios
module.exports = (sequelize, dataTypes) => {
    
    let alias = "Usuarios";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremental: true
        },
        nombre: {
            type: dataTypes.STRING(100),
        },
        apellido: {
            type: dataTypes.STRING(100),
        },
        correo: {
            type: dataTypes.STRING(100),
            unique: true
        },
        contraseña: {
            type: dataTypes.STRING,
        },
        direccion: {
            type: dataTypes.STRING(400),
        },
        telefono: {
            type: dataTypes.INTEGER,
        },
        fecha_nacimiento: {
            type: dataTypes.DATEONLY,
        }
    };

    let config = {
        tableName: "usuarios",
        timestamps : false //Analizar si esta opcion esta bien de acuerdo a la base de datos(6:35)
    };
    
    const Usuarios = sequelize.define(alias, cols, config);

    return Usuarios;
}