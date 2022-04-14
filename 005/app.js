var http = require('http');

http.createServer(function(req, res){
    res.end("Hello World! Welcome to my website");
}).listen(8081);

console.log("O servidor rodando");


