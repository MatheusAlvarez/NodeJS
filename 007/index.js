const Sequelize = require("sequelize");

// Conexão com o banco mysql
const database = new Sequelize('pwbe', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

// Criar tablena no Banco

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

// Inserindo valores
database.sync()
    // Adicionar dados
    .then(() =>{
        professores.create({
            nome: 'Matheus Maia Alvarez',
            idade: 17,
            nidentificador: 21,
            cargo: 'Aluno'
        })
    })

    // Mostrar dados (SELECT)
    .then(() =>{
        professores.findAll({where: {'id': 1}})
        .then(function(valuesTable){
            console.log(valuesTable)
        })
    })

    // Apagar Dados (DELETE)
    .then(() =>{
        professores.destroy({where: {'id': 1}})
    })

