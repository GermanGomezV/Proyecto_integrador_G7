//Modelo de la tabla Compra_productos
module.exports = (sequelize, dataTypes) => {
    
    let alias = "Compras_productos";

    let cols = {
        id_compras_productos: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremental: true
        },
        id_compra_FK: {
            type: dataTypes.INTEGER,
        },
        id_producto_FK: {
            type: dataTypes.INTEGER,
        },
        cantidad: {
            type: dataTypes.INTEGER,
        },
        subtotal: {
            type: dataTypes.INTEGER,
        }
    };

    let config = {
        tableName: "compras_productos",
        timestamps : false
    };
    
    const Compra_productos = sequelize.define(alias, cols, config);

    return Compra_productos;
}