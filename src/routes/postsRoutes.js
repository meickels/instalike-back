import express from "express"; // Importa o módulo Express para criar o servidor web
import multer from "multer";
import cors from "cors";
import { listarPosts , novoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

const corsOption = {
    origin: "http://localhost:8000",
    optionsSucessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {
    // Middleware para analisar o corpo das requisições JSON
    app.use(express.json());
    app.use(cors(corsOption));

    // Rota para obter todos os posts
    app.get("/posts", listarPosts);

    // Rota para criar novo posts
    app.post("/posts", novoPost)

    app.post("/upload", upload.single("imagem"),uploadImagem);
    
    app.put("/upload/:id", atualizarNovoPost);
}

export default routes;