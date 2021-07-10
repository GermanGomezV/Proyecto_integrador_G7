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
            type: dataTypes.TEXT,
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
        timestamps : false
    };
    
    const Usuarios = sequelize.define(alias, cols, config);

    Usuarios.associate = function (models) {
        Usuarios.belongsTo(models.Compras, {
            as: "compras",
            foreignKey: "usuario_id"
        });
    };

    return Usuarios;
}