//Importar biblioteca
const Sequelize = require('sequelize')

//Importar módulos
const database = require('../config/dbConnect')
const professores = require('../models/professoresModels')

class ProfessoresController{
    // Get -> Read
    static async listarDados(req, res){
        await database.sync()
        let dado = await professores.findAll({raw : true})
        res.status(200).json(dado)
    }

    static async listarDados2(req, res){
        let index = req.params.id
        await database.sync()
        let dado = await professores.findByPk(index)
        res.status(200).json(dado)
    }

    // // Post ->  Create
    static async inserirDado(req, res){
        let novoDado = req.body
        await database.sync()
        await professores.create(novoDado)
        res.status(201).send("Dado Criado")
    }

    // // Put -> Update
    static async alterarDado(req, res){
        let index = req.params.id
        let dadoAtualizado = req.body
        await database.sync()
        await professores.update(dadoAtualizado, {where: {id : index}})
        res.status(200).send("Dados Atualizados")
    }


    // // Delete -> Delete
    static async deletarDado(req, res){
        let index = req.params.id
        await database.sync()
        await professores.destroy({where: {id : index}})
        res.status(200).send("Dado deletado")
    }

}

module.exports = ProfessoresController;