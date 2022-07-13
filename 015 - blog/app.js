// Carregando Módulos
const express = require("express")
const handlebars = require("express-handlebars")
const bodyParser = require("body-parser");
const app = express();
const port = 8081; 
const admin = require("./routes/admin")
//const Mongoose = require("mongoose")

// ---------------- Configurações ----------------

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