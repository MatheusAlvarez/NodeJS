// Importar biblioteca
const Sequelize = require('sequelize')

//Conectar banco
const database = new Sequelize('pwbe', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = database