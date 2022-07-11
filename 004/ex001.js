const Express = require("express")
const app = Express();

const porta = 8081

app.get("/", function(req, res){
    res.sendFile(__dirname + "/html/index.html")
})

app.get("/sobre", function(req, res){
    res.send("Minha página é sobre")
})

app.get("/blog", function(){
    res.send("Bem-vindo ao meu blog")   
})

app.get("/ola/:nome/:cargo", function(req, res){
    res.send(req.params.cargo)
})

app.listen(porta, function(req, res){
    console.log("Servidor rodadando na porta " + porta)
}) 