const Sequelize = require("sequelize")
const sequelize = new Sequelize("teste", "root", "1234567", {
    host: "localhost",
    dialect: "mysql"
})

// Definir uma tabela
const Postagem = sequelize.define("Postagens", {
    titulo:{
        type: Sequelize.STRING
    },
    conteudo: {
        type: Sequelize.TEXT
    }
})

// Criar novo registro
//Postagem.create({
//    titulo: "Título qualquer",
//    conteudo: "conteúdo qualquer"
//})

const Usuario = sequelize.define("usuarios", {
    nome:{
        type: Sequelize.STRING
    },
    sobrenome:{
        type: Sequelize.STRING
    },
    idade:{
        type: Sequelize.INTEGER
    },
    email:{
        type: Sequelize.STRING
    }
})

Usuario.create({
    nome: "Matheus",
    sobrenome: "Maia Alvarez",
    idade: 17,
    email: "mthalvarez0000hotmail.com"
})