var sequelize = require('../config/dbcon');
const Sequelize = require('sequelize');
const nameSchema='coll_user';
const schema = sequelize.define (
    nameSchema, {
        id: {
            type: Sequelize.SMALLINT,
            primaryKey: true
        },
        nombre_primero:     Sequelize.STRING,
        nombre_segundo:     Sequelize.STRING,
        apellido_segundo:   Sequelize.STRING,
        apellido_primero:   Sequelize.STRING,
        email:              Sequelize.STRING,
        password:           Sequelize.STRING,
        id_documentoType:   Sequelize.NUMBER,
        documento_numero:   Sequelize.STRING,
        createdAt:          Sequelize.DATE,
        updatedAt:          Sequelize.DATE
    }
);
schema.belongsTo(require('./coll_documents_types'),{foreignKey: 'id_documentoType'});
module.exports=schema;


