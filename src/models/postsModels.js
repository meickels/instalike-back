import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js"; // Importa a função para conectar ao banco de dados

// Conecta ao banco de dados usando a string de conexão do ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getTodosPosts() {
    // Seleciona o banco de dados "instabytes"
    const db = conexao.db("instabytes");

    // Seleciona a coleção "posts"
    const colecao = db.collection("posts");

    // Busca todos os documentos da coleção e retorna como um array
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const db = conexao.db("instabytes");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("instabytes");
    const colecao = db.collection("posts");
    const objId = ObjectId.createFromHexString(id); //id recebido em um objeto que o banco entende 
    return colecao.updateOne({_id: new ObjectId(objId)}, {$set:novoPost});
}