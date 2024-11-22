import express from "express";
import { MongoClient } from "mongodb";

let idCounter = 1;
const posts = [
    {
        id: idCounter++,
        descricao: "Uma foto",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: idCounter++,
        descricao: "Um vídeo divertido",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: idCounter++,
        descricao: "Uma receita deliciosa",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: idCounter++,
        descricao: "Uma outra coisa",
        imagem: "https://placecats.com/millie/300/150"
    }
];

const app = express(); // app será o servidor
app.use(express.json()); //transforma estrutura em json para retorno

app.listen(3000, () => {
    console.log("Servidor escutando...");
});

app.get("/posts",(req, res) => {
    res.status(200).json(posts);
});;

function BuscaPostPorId(id){
    return posts.findIndex((post) => {
        return post.id == Number(id)
    })
};

app.get("/posts/:id",(req, res) => {
    const index = BuscaPostPorId(req.params.id)
    res.status(200).json(posts[index]);
});
