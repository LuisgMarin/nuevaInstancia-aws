const { Client } = require('pg')
const connectionData = {
    user: 'postgres',
    host: 'localhost',
    database: 'agenda_wilson',
    password: 'billing123*', 
    port: 5432,
  }
const client = new Client(connectionData)
module.exports = client;