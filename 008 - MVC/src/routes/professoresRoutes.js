// Importar bibliotecas
const express = require('express');
const router = express.Router();

//Importar módulos
const ProfessoresController = require('../controllers/professoresControllers')

// define the home page route
router.get('/', ProfessoresController.listarDados);
router.post('/adicionar', ProfessoresController.inserirDado)
router.put('/alterar/:id', ProfessoresController.alterarDado)
router.delete('/deletar/:id', ProfessoresController.deletarDado)


module.exports = router;