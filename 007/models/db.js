const Sequelize = require("sequelize");

// Conexão com o banco mysql
    const database = new Sequelize('pwbe', 'root', '', {
        host: 'localhost',
        dialect: 'mysql'
    });

module.exports={
    Sequelize: Sequelize,
    database: database
}