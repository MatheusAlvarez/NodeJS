var http = require("http");

http.createServer(function(req, res){
    res.end("Foi")
}).listen(8081);

console.log("Servidor rodando!")