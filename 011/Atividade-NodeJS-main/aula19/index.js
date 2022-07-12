const Express = require("express");
const app = Express();
const porta = 8081;
const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")
const Post = require("./models/Post")

// Config
    // Tamplate Engine
        app.engine('handlebars', handlebars.engine({
            defaultLayout: 'main',
            runtimeOptions: {
                allowProtoPropertiesByDefault: true,
        
                allowProtoMethodsByDefault: true,
            }
        }));
        app.set('view engine', 'handlebars');

    //Body parser
        app.use(bodyParser.urlencoded({extended: false}))
        app.use(bodyParser.json())

    // Rotas
        // Te joga pra rota principal
            app.get('/', function(req, res){
                res.render('initial')
            })

        // Te joga pra rota de "ADM"
            app.get('/adm', function(req, res){
                res.render('adm')
            })

        // Listar Dados 
            // Te joga pra rota de listagem
                app.get('/listagem', function(req,res){
                    Post.findAll({order:[['id', 'DESC']]})
                        .then(function(posts){
                            console.log(posts)
                            res.render('home', {posts: posts})
                        })
                })

        // Cadastrar Dados
            // Te joga pra rota de cadastro e te mostra a handlebar 'form'
                app.get("/cad", function(req, res){
                    res.render('form')
                })

            // Adiciona os dados passados pelo Form
                app.post("/add", function(req, res){
                    Post.create({
                        titulo: req.body.titulo,
                        Conteudo: req.body.conteudo
                    })
                        .then(function(){
                            res.redirect("/adm")
                        })
                            .catch(function(erro){
                                res.send("Ocorreu um erro: " + erro)
                            })
                })

        // Deletar Dados
            // Deleta os dados após pressionar o botão 'deletar'
                app.get("/deletar/:id", function(req, res){
                    Post.destroy({where: {'id': req.params.id}}) // Ele vai destruir onde o id ('id') for igual o id passado ('req.params.id')
                        .then(function(){    // Se existir, ele vai trazer a página 'deletar' do handlebar
                            res.render('deletar') 
                        })
                        .catch(function(erro){
                            res.send("Está postagem não existe! " + erro)
                        })
                })

        //Aterar Dados

            // app.get("/alt/:id", function(req, res){
            //     res.render('update')
            // })

            // app.get("/update/:id", function(req, res){
            //     Post.update({where: {'id': req.params.id}})
            //         .then(function(){
            //             res.send("FOI")
            //         })
            //             .catch(function(erro){
            //                 res.send("Ocorreu um erro: " + erro)
            //             })
            // })


// Servidor Rodando
    app.listen(porta, function(req, res){
        console.log("Servidor rodando")
    }); 