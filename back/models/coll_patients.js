const sequelize = require('../config/dbcon');
const Sequelize = require('sequelize');
const nameSchema = 'coll_patient';

const schema = sequelize.define(nameSchema, {
    id: {
        type: Sequelize.SMALLINT,
        primaryKey: true
    },
    id_documentoType: Sequelize.NUMBER,
    documento: Sequelize.STRING,
    nombre_primero: Sequelize.STRING,
    nombre_segundo: Sequelize.STRING,
    apellido_primero: Sequelize.STRING,
    apellido_segundo: Sequelize.STRING,
    fecha_nacimiento: Sequelize.DATE,
    email: Sequelize.STRING,
    numero_contacto: Sequelize.STRING,
    pais: Sequelize.STRING,
    ciudad: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

schema.belongsTo(require('./coll_documents_types'), { foreignKey: 'id_documentoType' });

schema.prototype.getMaskedData = function () {
    return {
        ...this.get(),
        email: this.email ? this.email.replace(/(.{2}).*(@.*)/, "$1***$2") : null,//oculta email
        numero_contacto: this.numero_contacto ? this.numero_contacto.replace(/(\d{3})\d{4}(\d{2})/, "$1****$2") : null, //oculta numero de contacto
        ciudad: this.ciudad ? `${this.ciudad.substring(0, 2)}***` : null, //oculta ciudad
        departamento: this.departamento ? `${this.departamento.substring(0, 2)}***` : null,//oculta departamento
        fecha_nacimiento: this.fecha_nacimiento ? '****-**-**' : null, // Oculta la fecha de nacimiento
    };
};

module.exports = schema;
