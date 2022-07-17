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
    Categoria.find().sort({data: "desc"}) // Vai listar todos documentos que existem
    .then((categorias) =>{
        res.render("./admin/categorias", {categorias: categorias})
    })
    .catch((err) =>{
        req.flash("error_msg", "Houve um erro ao listar as categorias")
        res.redirect("/admin")
    });
})

router.get("/categorias/add", (req, res) => {
    res.render("./admin/addcategorias")
})

// .post pois essa rota vai cadastrar a categoria
router.post("/categorias/nova", (req, res) =>{

    var erros = []

    // 1 - Se o campo nome for vazio || 2 - Se o valor do campo nome for undefined || 3 - Se o campo nome for nulo
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome inválido"}) // Ela serve pra colocar um dado no Array (.push)
    }

    if(req.body.nome.length < 2){
        erros.push({texto: "Nome da categoria muito pequeno"})
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({texto: "Slug inválido"})
    }

    if(erros.length > 0){
        res.render("./admin/addcategorias", {erros: erros})
    }
    else{
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }
    
        new Categoria(novaCategoria).save()
        .then(() => {
            req.flash("success_msg", "Categoria criada com sucesso!")
            res.redirect("/admin/categorias") // Vai redirecionar para: "./admin/categorias"
        })
        .catch((err) => {
            req.flash("error_msg", "Erro ao criar a categoria, tente novamente!")
            res.redirect("/admin")
        })
    }
})

// Exportação do arquivo
module.exports = router; 