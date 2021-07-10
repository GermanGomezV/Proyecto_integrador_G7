//Modelo de la tabla Categorias
module.exports = (sequelize, dataTypes) => {
    
    let alias = "Categorias";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremental: true
        },
        nombre: {
            type: dataTypes.STRING(100),
        }
    };

    let config = {
        tableName: "categoria",
        timestamps : false
    };
    
    const Categorias = sequelize.define(alias, cols, config);

    Categorias.associate = function (models) {
        Categorias.hasMany(models.Productos, {
            as: "productos",
            foreignKey: "categoria_id"
        });
    };

    return Categorias;
}