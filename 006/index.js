const express = require("express");
const app = express(); 

app.get("/", function(req, res){
    res.send("Seja bem-vindo")
})

app.get("/sobre", function(req, res){
    res.send("Sobre")
})

app.get("/blog", function(req,res){
    res.send("Bem-vindo ao meu blog")
})

app.listen(8081, function(res, req){
    console.log("Servidor rodando")
})