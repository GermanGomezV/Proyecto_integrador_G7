//Modelo de la tabla Compras
module.exports = (sequelize, dataTypes) => {
    
    let alias = "Compras";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremental: true
        },
        usuario_id: {
            type: dataTypes.INTEGER,
        },
        fecha_compra: {
            type: dataTypes.DATETIME,
        }
    };

    let config = {
        tableName: "compras",
        timestamps : false
    };
    
    const Compras = sequelize.define(alias, cols, config);

    Compras.associate = function (models) {
        Compras.hasMany(models.Usuario, {
            as: "usuario",
            foreignKey: "usuario_id"
        });

        Compras.belongsToMany(models.Producto, {
            as: "productos",
            through: "compra_productos",
            foreignKey: "compra_id",
            otherKey: "producto_id",
            timestamps : false
        });
    };

    return Compras;
}