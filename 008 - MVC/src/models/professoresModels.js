const Sequelize = require('sequelize')
const database = require("../config/dbConnect")

//Criação da tabela (Modelo/Model ->(Model)VC)
const professores = database.define('professores', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome:{
        type: Sequelize.STRING
    },
    idade:{
        type: Sequelize.INTEGER
    },
    nidentificador:{
        type: Sequelize.INTEGER
    },
    cargo:{
        type: Sequelize.STRING
    }
})

module.exports = professores