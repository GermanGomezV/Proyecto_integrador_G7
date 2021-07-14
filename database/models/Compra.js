//Modelo de la tabla Compras
module.exports = (sequelize, dataTypes) => {
    
    let alias = "Compras";

    let cols = {
        id_compra: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremental: true
        },
        id_usuario_FK: {
            type: dataTypes.INTEGER,
        },
        fecha_compra: {
            type: dataTypes.DATE,
        }
    };

    let config = {
        tableName: "compras",
        timestamps : false
    };
    
    const Compras = sequelize.define(alias, cols, config);

    Compras.associate = function (models) {
        Compras.hasMany(models.Usuarios, {
            as: "usuarios",
            foreignKey: "id_usuario_FK"
        });

        Compras.belongsToMany(models.Productos, {
            as: "productos",
            through: "compra_productos",
            foreignKey: "id_compra_FK",
            otherKey: "id_producto_FK",
            timestamps : false
        });
    };

    return Compras;
}