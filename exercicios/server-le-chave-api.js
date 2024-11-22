import express from "express";

import dotenv from 'dotenv'; // Importa o dotenv
dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env
const apiKey = process.env.GEMINI_API_KEY; // Agora você pode acessar a chave da API usando process.env
console.log(`Chave da API: ${apiKey}`); // Apenas para verificar se está funcionando

const app = express(); // app será o servidor

var msg = "Olá Mundo";
console.log(msg);

app.listen(3000, () => {
    console.log("Servidor escutando...");
});

app.get("/api",(req, res) => {
    res.status(200).send("Boas Vindas");
});
