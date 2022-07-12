const db = require("./db");

const Post = db.sequelize.define('postagens', {
    titulo:{
        type: db.Sequelize.STRING
    },
    Conteudo:{
        type: db.Sequelize.TEXT
    }
});

module.exports = Post;