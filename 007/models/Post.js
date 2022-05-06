const db = require("./db")

const professores = db.database.define('professores', {
    id:{
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome:{
        type: db.Sequelize.STRING
    },
    idade:{
        type: db.Sequelize.INTEGER
    },
    nidentificador:{
        type: db.Sequelize.INTEGER
    },
    cargo:{
        type: db.Sequelize.STRING
    }
})

module.exports = professores;