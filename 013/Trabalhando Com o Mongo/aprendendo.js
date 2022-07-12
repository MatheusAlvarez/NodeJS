const mongoose = require("mongoose")

// Criar a conexão 
// mongoose.connect("mongodb:// endereço do servidor mongo")

// Evita alguns erros durante o processo de desenvolvimento de alguma aplicação
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/aprendendo", {
    // Vai evitar alguns erros
    useNewUrlParser: true
})
.then(() =>{
    console.log("MongoDB Conectado...")
})
.catch((err) =>{
    console.log("Houve um erro a se conectar ao mongoDB: " + err)
});

// Model - Usuários--------------------------

// Definindo Model--------------------------
// Usamos o sufixo Schema no final do nome por padrão
// Dentro se ".Schema" definimos nosso model
const UsuarioSchema = mongoose.Schema({
    nome:{
        type: String,

        // se o campo vai ser obrigatório ou não
        require: true
    },
    sobreNome:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    idade:{
        type: Number,
        require: true
    },
    pais:{
        type: String
    }
});

// Collection --------------------------
// mongoose.model('nome da Collection (nome da "tabela") ', nome do model)
mongoose.model('Usuarios', UsuarioSchema)

//Inserir dados --------------------------
// Armazenando a referência do nosso Schema dentro da constante "novoUsuario" 
const novoUsuario = mongoose.model('Usuarios')

new novoUsuario({
    nome: "Lucas",
    sobreNome: "Alvarez",
    email: "lcsalvarez0000@hotmail.com",
    idade: 5,
    pais: "Brasil"
}).save() // Vai salvar nosso usuário
.then(() => {
    console.log("Usuário registrado com sucesso!!!")
})
.catch(() => {
    console.log("Houve um erro ao registrar o usuário: " + err)
})