const express = require("express");
const router = express.Router();

// Rotas
router.get("/", (req, res) =>{
    res.render("./admin/index")
})

router.get("/posts", (req, res) =>{
    res.send("Página de posts")
})

router.get("/categorias", (req, res) =>{
    res.send("Página de categorias")
})

// Exportação do arquivo
module.exports = router; 