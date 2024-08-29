var sequelize = require('../config/dbcon');
const Sequelize = require('sequelize');
const nameSchema='coll_cita';
const schema = sequelize.define
(
    nameSchema, 
    {
        id: {
            type: Sequelize.SMALLINT, 
            primaryKey: true
        },
        id_paciente     : Sequelize.NUMBER,
        id_especialista : Sequelize.NUMBER,
        id_eps          : Sequelize.NUMBER,
        tipocita        : Sequelize.STRING,
        fecha           : Sequelize.DATE,
        hora            : Sequelize.TIME,
        observacion     : Sequelize.STRING,
        id_estado       : Sequelize.NUMBER,
        createdAt       : Sequelize.DATE,
        updatedAt       : Sequelize.DATE
    }
);
schema.belongsTo(require('./coll_especialistas'),{foreignKey: 'id_especialista'});
schema.belongsTo(require('./coll_patients'),     {foreignKey: 'id_paciente'});
schema.belongsTo(require('./coll_citas_estado'), {foreignKey: 'id_estado'});
schema.belongsTo(require('./coll_eps'),          {foreignKey: 'id_eps'});
module.exports=schema;