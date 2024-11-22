import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express(); // app será o servidor

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var msg = "Olá Mundo";
console.log(msg);

app.listen(3000, () => {
    console.log("Servidor escutando...");
});

app.get("/api",(req, res) => {
    res.status(200).send("Boas Vindas");
});

app.get("/livro",(req, res) => {
    res.sendFile(path.join(__dirname, "livros.json"))
});