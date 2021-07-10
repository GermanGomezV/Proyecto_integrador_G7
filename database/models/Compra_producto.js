//Modelo de la tabla Compra_productos
module.exports = (sequelize, dataTypes) => {
    
    let alias = "Compra_productos";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremental: true
        },
        compra_id: {
            type: dataTypes.INTEGER,
        },
        producto_id: {
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
        tableName: "compra_productos",
        timestamps : false
    };
    
    const Compra_productos = sequelize.define(alias, cols, config);

    return Compra_productos;
}