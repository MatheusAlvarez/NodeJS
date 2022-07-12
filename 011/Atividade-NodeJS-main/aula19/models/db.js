const Sequelize = require("sequelize");

// Conexão com o banco mysql
    const sequelize = new Sequelize('PostApp', 'root', '1234567', {
        host: 'localhost',
        dialect: 'mysql'
    });

module.exports={
    Sequelize: Sequelize,
    sequelize: sequelize
}