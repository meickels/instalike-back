import express from "express";
import routes from "./src/routes/postsRoutes.js";

const app = express(); // app será o servidor
app.use(express.static("uploads")); //abre a pasta para visualização
routes(app);

app.listen(3000, () => {
    console.log("Servidor escutando...");
});

function BuscaPostPorId(id){
    return posts.findIndex((post) => {
        return post.id == Number(id)
    })
};

app.get("/posts/:id",(req, res) => {
    const index = BuscaPostPorId(req.params.id)
    res.status(200).json(posts[index]);
});
