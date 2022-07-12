const mongoose = require("mongoose")

// Criar a conexão 
// mongoose.connect("mongodb:// endereço do servidor mongo")

// Evita alguns erros durante o processo de desenvolvimento de alguma aplicação
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/aprendendo", {
    // Vai evitar alguns erros
    useMongoClient: true
})
.then(() =>{
    console.log("MongoDB Conectado...")
})
.catch((err) =>{
    console.log("Houve um erro a se conectar ao mongoDB: " + err)
})