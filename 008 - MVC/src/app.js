// Importar as bibliotecas
const Express = require('express')
const app = Express();

app.use(Express.json())

//Importar módulos
const rotas = require('./routes/professoresRoutes')
app.use('/', rotas)

//Variáveis
const port = 3000

//Servidor
app.listen(port, function(req, res){
    console.log('Servidor Rodando')
})