import fs from "fs";
import { getTodosPosts , criarPost , atualizarPost} from "../models/postsModels.js";
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listarPosts(req, res) {
    // Obtém todos os posts
    const posts = await getTodosPosts();

    // Envia os posts como resposta JSON com status 200 (OK)
    res.status(200).json(posts);
}

export async function novoPost(req, res) {
    // Obtém todos os posts
    const novaPostagem = req.body;
    try {
        const postCriado = await criarPost(novaPostagem);
        res.status(200).json(postCriado);
    }
    catch(erro){
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
    finally {    
        console.log("Postou");
    }
}

export async function uploadImagem(req, res) {
    // Obtém todos os posts
    const novaPostagem = {
        descricao: "",
        imgUrl: req.file.originalname, 
        alt:""
    };

    try {
        const postCriado = await criarPost(novaPostagem);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json(postCriado);
    }
    catch(erro){
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na criacao"});
    }
    finally {    
        console.log("Enviou imagem");
    }
}

export async function atualizarNovoPost(req, res) {
    // Obtém todos os posts
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;

    try {
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imageBuffer);

        const postAtualizado = {
            descricao: descricao,
            imgUrl: urlImagem,
            alt: req.body.alt 
        };
        const postCriado = await atualizarPost(id,postAtualizado);      
        res.status(200).json(postCriado);
    }
    catch(erro){
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
    finally {    
        console.log("Atualizou");
    }
}