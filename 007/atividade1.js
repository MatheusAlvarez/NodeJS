// Importar as bibliotecas
const Sequelize = require('sequelize')
const Express = require('express')
const app = Express();

app.use(Express.json())

//Variáveis
const port = 3000

//Conectar banco
const bancodados = new Sequelize('pwbe', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

//Criação da tabale (Modelo/Model ->(Model)VC)
const professores = bancodados.define('professores', {
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

// Verbos HTTP CRUD

// Get -> Read
app.get('/', async function(req, res){
    await bancodados.sync()
    let dado = await professores.findAll({raw : true})
    res.status(200).json(dado)
})

app.get('/:id', async function(req, res){
    let index = req.params.id
    await bancodados.sync()
    let dado = await professores.findByPk(index)
    res.status(200).json(dado)
})

// Post ->  Create
app.post('/', async function(req, res){
    let novoDado = req.body
    await bancodados.sync()
    await professores.create(novoDado)
    res.status(201).send("Dado Criado")
})

// Put -> Update
app.put('/:id', async function(req, res){
    let index = req.params.id
    let dadoAtualizado = req.body
    await bancodados.sync()
    await professores.update(dadoAtualizado, {where: {id : index}})
    res.status(200).send("Dados Atualizados")
})

// Delete -> Delete
app.delete('/:id', async function(req, res){
    let index = req.params.id
    await bancodados.sync()
    await professores.destroy({where: {id : index}})
    res.status(200).send("Dado deletado")
})

//Servidor
app.listen(port, function(req, res){
    console.log('Servidor Rodando')
})