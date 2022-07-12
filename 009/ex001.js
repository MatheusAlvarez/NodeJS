const Sequelize = require("sequelize")
const sequelize = new Sequelize("sistemadecadastro", "root", "1234567", {
    host: "localhost",
    dialect: "mysql"
});

sequelize.authenticate()
    .then(function(){
    console.log("Conectado om sucesso")
    })
    .catch(function(erro){
        console.log("Falha ao se conectar " + erro)
    })