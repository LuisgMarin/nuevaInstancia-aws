var sequelize = require('../config/dbcon');
const Sequelize = require('sequelize');
const nameSchema='coll_especialista';
const schema = sequelize.define
(
    nameSchema, 
    {
        id: {
            type: Sequelize.SMALLINT, 
            primaryKey: true
        },
        nombre_primero       : Sequelize.STRING,
        nombre_segundo       : Sequelize.STRING,
        apellido_primero     : Sequelize.STRING,
        apellido_segundo     : Sequelize.STRING,
        documento_numero     : Sequelize.STRING,
        id_documento_tipo    : Sequelize.NUMBER,
        id_especialidad_tipo : Sequelize.NUMBER,
        createdAt            : Sequelize.DATE,
        updatedAt            : Sequelize.DATE
    }
);
schema.belongsTo(require('./coll_specialties'),{foreignKey: 'id_especialidad_tipo'});
module.exports=schema;
