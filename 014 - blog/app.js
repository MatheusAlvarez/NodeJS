// Carregando Módulos
const express = require("express")
const handlebars = require("express-handlebars")
const bodyParser = require("body-parser");
const app = express();
const port = 8081; 
//const Mongoose = require("mongoose")

// Configurações
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

// Rotas

// Outros
app.linsten(port, () =>{
    console.log("Servidor rodando!!")
})