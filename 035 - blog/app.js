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
const flash = require("connect-flash") // É a mensagem que aparece dizendo: "Conta criada com succeso", "Erro ao criar a conta"
require("./models/Postagem")
const Postagem = mongoose.model("postagens")
require("./models/Categoria")
const Categoria = mongoose.model("categorias")

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
        Postagem.find().populate("categoria").sort({data: "desc"})
        .then((postagens) => {
            res.render("index", {postagens: postagens})            
        })
        .catch((err) => {
            req.flash("error_msg", "Houve um erro interno")
            res.redirect("/404")
        })

    })

    app.get("/postagem/:slug", (req, res) => {
        Postagem.findOne({slug: req.params.slug})
        .then((postagem) => {
            if(postagem){
                res.render("postagem/index", {postagem: postagem})
            }
            else{
                req.flash("error_msg", "Esta postagem não existe")
                res.redirect("/")
            }
        })
        .catch((err) => {
            req.flash("error_msg", "Houve um erro interno")
            res.redirect("/")
        })
    })

    app.get("/categorias", (erq, res) => {
        Categoria.find()
        .then((categorias) => {
            res.render("categorias/index", {categorias: categorias})
        })
        .catch((err) => {
            req.flash("error_msg", "Houve um erro interno ao listar as categorias")
            res.redirect("/")
        })
    })

    app.get("/categorias/:slug", (req, res) => {
        Categoria.findOne({slug: req.params.slug})
        .then((categoria) => {
           if(categoria){
                Postagem.find({categoria: categoria._id})
                .then((postagens) => {
                    res.render("categorias/postagens", {postagens: postagens, categoria: categoria})
                })
                .catch((err) => {
                    req.flash("error_msg", "Houve um erro ao listar os posts")
                    res.redirect("/")
                })
            }
           else{
                req.flash("error_msg", "Esta categoria não existe")
                res.redirect("/")
           } 
        })
        .catch((err) => {
            req.flash("error_msg", "Houve um erro interno ao carregar a página desta categoria")
            res.redirect("/")
        })
    })

    app.get("/404", (req, res) => {
        res.send("Erro 404!")
    })

    app.get("/posts", (req, res) =>{
        res.send("Lista de Posts")
    })

// ---------------- Outros ----------------
app.listen(port, () =>{
    console.log("Servidor rodando!!")
})