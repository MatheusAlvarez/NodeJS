// Carregando Módulos
const express = require("express") // Const criada para pegar o express
const handlebars = require("express-handlebars") // const criada para pegar o hadlebars
const bodyParser = require("body-parser"); // Const criada para pegar o body parser
const app = express(); // Const criada para pegar o express
const port = 8081; // Const criada para definir a porta
const admin = require("./routes/admin") // Essa const está pegando o modlu exportado do arquivo admin
const path = require("path") // Serve para trabalhar com diretórios (pastas)
const mongoose = require("mongoose")
const session = require("express-session") // É um tipo de sessão que aparece uma vez, quando a página é recarregada ela desaparece 
const flash = require("connect-flash")

// ---------------- Configurações ----------------
    // Sessão
    app.use(session ({
        secret: "teste", // Chave pra gerar uma sessão
        resave: true,
        saveUninitialized: true
    }))

    // Flash
    app.use(flash())

    // Middleware
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash("success_msg") // Criar variáveis globais (.locals)
        res.locals.error_msg = req.flash("error_msg")
        next()
    })

    // Body Parser
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());

    //Handlebars
    app.engine('handlebars', handlebars.engine({
        defaultLayout: 'main',
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
    
            allowProtoMethodsByDefault: true,
        }
    }));
    app.set('view engine', 'handlebars');

    // Mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost/blogapp")
    .then(() =>{
        console.log("Conectado ao mongo")
    })
    .catch((err) =>{
        console.log("Não foi possível se conectar com o banco: " + err)
    })

    // Public
    app.use(express.static(path.join(__dirname, "public"))) // Estamos falando parar o express que a pasta que está guardando todos os nossos arquivos staticos é a pasta public

    // Criando um Middlewares 
    app.use((req, ress, next) => {
        console.log("Olá, sou um Middleware")
        next() // Vai passar passar a requisição
    })
// ---------------- Rotas ----------------
    // Criamos um prefixo "/admin" para acessar as rotas, 
    // precisamos colocar o prefixo antes da rota
    app.use("/admin", admin)

    // Rota sem prefixo
    app.get("/", (req, res) =>{
        res.send("Rota principal")
    })

    app.get("/posts", (req, res) =>{
        res.send("Lista de Posts")
    })

// ---------------- Outros ----------------
app.listen(port, () =>{
    console.log("Servidor rodando!!")
})