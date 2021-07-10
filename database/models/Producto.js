//Modelo de la tabla Productos
module.exports = (sequelize, dataTypes) => {
    
    let alias = "Productos";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremental: true
        },
        nombre: {
            type: dataTypes.STRING(100),
        },
        descripcion: {
            type: dataTypes.TEXT,
        },
        precio: {
            type: dataTypes.FLOAT,
        },
        descuento: {
            type: dataTypes.INTEGER,
        },
        categoria_id: {
            type: dataTypes.INTEGER,
        }
    };

    let config = {
        tableName: "productos",
        timestamps : false
    };
    
    const Productos = sequelize.define(alias, cols, config);

    Productos.associate = function (models) {
        Productos.belongsTo(models.Categorias, {
            as: "categoria",
            foreignKey: "categoria_id"
        });

        Productos.belongsToMany(models.Compras, {
            as: "compras",
            through: "compra_productos",
            foreignKey: "producto_id",
            otherKey: "compra_id",
            timestamps : false
        });
    };

    return Productos;
}