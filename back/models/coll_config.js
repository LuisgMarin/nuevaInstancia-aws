var sequelize = require('../config/dbcon');
const Sequelize = require('sequelize');
const nameSchema='coll_config';
const schema = sequelize.define
(
    nameSchema, 
    {
        id: {
            type: Sequelize.SMALLINT, 
            primaryKey: true
        },
        value     : Sequelize.STRING,
        name      : Sequelize.STRING,
        createdAt : Sequelize.DATE,
        updatedAt : Sequelize.DATE
    }
);
module.exports=schema;