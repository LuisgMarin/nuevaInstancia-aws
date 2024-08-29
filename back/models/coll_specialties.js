var sequelize = require('../config/dbcon');
const Sequelize = require('sequelize');
const nameSchema='coll_specialtie';
const schema = sequelize.define
(
    nameSchema, 
    {
        id: {
            type: Sequelize.SMALLINT, 
            primaryKey: true
        },
        name        : Sequelize.STRING,
        description : Sequelize.STRING,
        createdAt   : Sequelize.DATE,
        updatedAt   : Sequelize.DATE
    }
);
module.exports=schema;

