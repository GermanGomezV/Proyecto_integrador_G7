//Modelo de la tabla Usuarios
module.exports = (sequelize, dataTypes) => {
    
    let alias = "Usuarios";

    let cols = {
        id_usuario: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremental: true
        },
        nombre: {
            type: dataTypes.STRING(50),
        },
        apellido: {
            type: dataTypes.STRING(50),
        },
        correo: {
            type: dataTypes.STRING(100),
            unique: true
        },
        contrasena: {
            type: dataTypes.STRING(200),
        },
        direccion: {
            type: dataTypes.STRING(200),
        },
        telefono: {
            type: dataTypes.INTEGER,
        },
        fecha_nacimiento: {
            type: dataTypes.DATE,
        },
        imagen: {
            type: dataTypes.STRING(100),
        }
    };

    let config = {
        tableName: "usuarios",
        timestamps : false
    };
    
    const Usuarios = sequelize.define(alias, cols, config);

    Usuarios.associate = function (models) {
        Usuarios.hasMany(models.Compras, {
            as: "compras",
            foreignKey: "id_usuario_FK"
        });
    };

    return Usuarios;
}