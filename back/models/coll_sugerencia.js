var sequelize = require('../config/dbcon');
const Sequelize = require('sequelize');
const nameSchema='coll_sugerencias';
const schema = sequelize.define
(
    nameSchema, 
    {
        id: {
            type: Sequelize.SMALLINT, 
            primaryKey: true
        },
        description : Sequelize.STRING,
        fecha       : Sequelize.DATE,
        createdAt   : Sequelize.DATE,
        updatedAt   : Sequelize.DATE
    }
);
module.exports=schema;

