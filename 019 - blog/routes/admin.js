const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
require("../models/Categoria")
const Categoria = mongoose.model("categorias")

// Rotas
router.get("/", (req, res) =>{
    res.render("./admin/index")
})

router.get("/posts", (req, res) =>{
    res.send("Página de posts")
})

router.get("/categorias", (req, res) =>{
    res.render("./admin/categorias")
})

router.get("/categorias/add", (req, res) => {
    res.render("./admin/addcategorias")
})

// .post pois essa rota vai cadastrar a categoria
router.post("/categorias/nova", (req, res) =>{
    const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    }

    new Categoria(novaCategoria).save()
    .then(() => {
        console.log("Cadastrado com sucesso")
    })
    .catch((err) => {
        console.log("Erro ao cadastrar: " + err)
    })
})

// Exportação do arquivo
module.exports = router; 