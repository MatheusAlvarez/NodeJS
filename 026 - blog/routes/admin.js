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

router.get("/categorias/edit/:id", (req, res) =>{
    Categoria.findOne({_id: req.params.id}).lean()
    .then((categorias) => {
        res.render("./admin/editcategorias", {categorias: categorias})
    })
    .catch((err) => {
        req.flash("error_msg", "Esta categoria não existe")
        res.redirect("/admin/categorias")
    })
})

router.post("/categorias/edit", (req, res) => {
    Categoria.findOne({ _id: req.body.id })
    .then((categorias) => {
        let erros = []

        if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
            erros.push({ texto: "Nome invalido" })
        }

        if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
            erros.push({ texto: "Slug invalido" })
        }
        
        if (req.body.nome.length < 2) {
            erros.push({ texto: "Nome da categoria muito pequeno" })
        }
        
        if (erros.length > 0) {
            Categoria.findOne({ _id: req.body.id }).lean().then((categorias) => {
                res.render("admin/editcategorias", { categoria: categorias})

            }).catch((err) => {
                req.flash("error_msg", "Erro ao pegar os dados")
                res.redirect("admin/categorias")
            })

        } 
        else {
            categorias.nome = req.body.nome
            categorias.slug = req.body.slug

            categorias.save()
            .then(() => {
                req.flash("success_msg", "Categoria editada com sucesso!")
                res.redirect("/admin/categorias")
            })
            .catch((err) =>{
                req.flash("error_msg", "Houve um erro ao editar a categoria: ")
                res.redirect("/admin/categorias")
            })
        }
    })
    .catch((err) => {
        req.flash("error_msg", "Houve um erro ao editar a categoria")
        res.redirect("/admin/categorias")
    })
})

router.post("/categorias/deletar", (req, res) => {
    Categoria.remove({_id: req.body.id}) // Vai remover a categoria que tem o id = ao id no fomulário
    .then(() => {
        req.flash("success_msg", "Categoria deletada com sucesso!")
        res.redirect("/admin/categorias")
    })
    .catch((err) => {
        req.flash("error_msg", "Não foi possivel deletar a categoria")
        res.redirect("/admin/categorias")
    })
})

// Exportação do arquivo
module.exports = router; 