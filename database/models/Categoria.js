//Modelo de la tabla Categorias
module.exports = (sequelize, dataTypes) => {
    
    let alias = "Categorias";

    let cols = {
        id_categoria: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremental: true
        },
        nombre: {
            type: dataTypes.STRING(100),
        }
    };

    let config = {
        tableName: "categorias",
        timestamps : false
    };
    
    const Categorias = sequelize.define(alias, cols, config);

    Categorias.associate = function (models) {
        Categorias.hasMany(models.Productos, {
            as: "productos",
            foreignKey: "id_categoria_FK"
        });
    };

    return Categorias;
}