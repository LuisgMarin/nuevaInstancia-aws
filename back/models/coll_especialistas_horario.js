var sequelize = require('../config/dbcon');
const Sequelize = require('sequelize');
const nameSchema='coll_especialistas_horario';
const schema = sequelize.define
(
    nameSchema, 
    {
        id: {
            type: Sequelize.SMALLINT, 
            primaryKey: true
        },
        id_especialista : Sequelize.NUMBER,
        fecha           : Sequelize.DATE,
        hora_inicio     : {type: Sequelize.TIME},
        hora_fin        : {type: Sequelize.TIME},
        createdAt       : Sequelize.DATE,
        updatedAt       : Sequelize.DATE
    }
);
module.exports=schema;