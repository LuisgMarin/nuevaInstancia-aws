const Sequelize = require('sequelize')
const database = require('../env');
let sequelize = new Sequelize(
  database.nombreBaseDeDatos,  // Nombre de tu base de datos
  database.usuarioBaseDeDatos,    // Nombre de usuario de tu base de datos
  database.contraseñaBaseDeDatos,       // Contraseña de tu base de datos
  {
    host: 'localhost',
    dialect: 'postgresql',
    omitNull: true
  }
)

if(database.databaseTestConexion) {
  sequelize
  .authenticate()
  .then(data => {
    console.log('Connection has been established successfully', data);
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
}

module.exports = sequelize;