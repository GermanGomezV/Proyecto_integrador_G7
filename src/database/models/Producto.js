//Modelo de la tabla Productos
module.exports = (sequelize, dataTypes) => {
    
    let alias = "Productos";

    let cols = {
        id_producto: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremental: true
        },
        nombre: {
            type: dataTypes.STRING(50),
        },
        descripcion: {
            type: dataTypes.STRING(500),
        },
        precio: {
            type: dataTypes.FLOAT,
        },
        descuento: {
            type: dataTypes.INTEGER,
        },
        id_categoria_FK: {
            type: dataTypes.INTEGER,
        },
        imagen: {
            type: dataTypes.STRING(100)
        }
    };

    let config = {
        tableName: "productos",
        timestamps : false
    };
    
    const Productos = sequelize.define(alias, cols, config);

    Productos.associate = function (models) {
        Productos.belongsTo(models.Categorias, {
            as: "categorias",
            foreignKey: "id_categoria_FK"
        });

        Productos.belongsToMany(models.Compras, {
            as: "compras",
            through: "compras_productos",
            foreignKey: "id_producto_FK",
            otherKey: "id_compra_FK",
            timestamps : false
        });
    };

    return Productos;
}