const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
require("../models/Categoria")
const Categoria = mongoose.model("categorias")
require("../models/Postagem")
const Postagem  = mongoose.model("postagens")

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

router.get("/postagens", (req, res) => {
    Postagem.find().lean().populate("categoria").sort({data: "desc"}).then((postagens) => {
        res.render("admin/postagens", {postagens: postagens})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar as postagens")
        res.redirect("/admin")
    })

})

router.get("/postagens/add", (req, res) => {
    Categoria.find()
    .then((categorias) =>{
        res.render("./admin/addpostagem", {categorias: categorias})
    })
    .catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar o formulário")
        res.redirect("/admin")
    })
})

router.post("/postagens/nova", (req, res) => {
    var erros = []

    if(req.body.categoria == "0"){
        erros.push({texto: "Categoria inválida, registre uma categoria"})
    }

    if(erros.legth > 0){
        res.render("/admin/addpostagens", {erros: erros})
    }
    else{
        const novaPostagem = {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria,
            slug: req.body.slug
        }

        new Postagem(novaPostagem).save()
        .then(() => {
            req.flash("success_msg", "Postagem criada com sucesso!")
            res.redirect("/admin/postagens")
        })
        .catch((err) => {
            req.flash("error_msg", "Não foi possível criar uma postagem")
            res.redirect("/admin/postagens")
        })
    }
})

router.get("/postagens/edit/:id", (req, res) => {
    Postagem.findOne({_id: req.params.id})
    .then((postagem) =>{
        Categoria.find()
        .then((categorias) => {
            res.render("admin/editpostagens", {categorias: categorias, postagem: postagem});
        })
        .catch((err) => {
            req.flash("error_msg", "Houve um erro ao editar as categorias")
            res.redirect("/admin/postagens")
        })
    })
    .catch((err) => {
        req.flash("erros_msg", "Houve um erro ao editar a postagem")
        res.redirect("/admin/postagens")
    })
})

router.post("/postagem/edit", (req, res) => {
    Postagem.findOne(({_id: req.body.id}))
    .then((postagem) => {
        postagem.titulo = req.body.titulo
        postagem.slug = req.body.slug
        postagem.descricao = req.body.descricao
        postagem.conteudo = req.body.conteudo
        postagem.categoria = req.body.categoria

        postagem.save()
        .then(() =>{
            req.flash("success_msg","Postagem editada com sucesso")
            res.redirect("/admin/postagens")
        })
        .catch((err) =>{
            req.flash("error_msg", "Erro interno")
            res.redirect("/admin/postagens")
        })
    })
    .catch((err) => {
        console.log(err)
        req.flash("error_msg", "Houve um erro ao editar a postagem")
        res.redirect("/admin/postagens")
    })
})

router.get("/postagens/deletar/:id", (req, res) =>{
    Postagem.remove({_id: req.params.id})
    .then(() => {
        req.flash("success_msg", "Postagem deletada com sucesso")
        res.redirect("/admin/postagens")
    })
    .catch((err) => {
        req.flash("error_msg", "Houve um erro ao deletar a postagem")
    })
})

// Exportação do arquivo
module.exports = router; 