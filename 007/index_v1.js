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

// Mostrar dados (SELECT)
async function apresentaValores(){
    await database.sync()
    let dados = await professores.findAll()
    console.log(dados)
}

// Mostrar dados (SELECT) com WHERE
async function apresentaValoresUnicos(){
    await database.sync()
    let dados = await professores.findAll(({where: {'id': 2}}))
    console.log(dados)
}

// Mostrar dados (SELECT) com ORDER
async function apresentaValoresOrdem(){
    await database.sync()
    let dados = await professores.findAll({order:[['id', 'DESC']]})
    console.log(dados)
}

// Deleta valor 
async function deletaValor(){
    await database.sync()
    let dados = await professores.destroy(({where: {'id': 2}}))
    console.log(dados)
}

// Adiciona Valor
async function adicionaValor(){
    await database.sync()
    let dados = await professores.create()
    console.log(dados)
}

// deletaValor()
adicionaValor()