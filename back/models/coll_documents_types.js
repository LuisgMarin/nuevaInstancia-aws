var sequelize = require('../config/dbcon');
const Sequelize = require('sequelize');
const nameSchema='coll_documents_type';
const schema = sequelize.define
(
    nameSchema, 
    {
        id: {
            type: Sequelize.SMALLINT, 
            primaryKey: true
        },
        name       : Sequelize.STRING,
        name_short : Sequelize.STRING,
        createdAt  : Sequelize.DATE,
        updatedAt  : Sequelize.DATE
    }
);
module.exports=schema;