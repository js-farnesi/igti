import express from "express";
import { promises } from "fs";
import lancamentosRouter from "./routes/lancamentos.js"

const { readFile, writeFile } = promises;

global.fileName = "lancamentos.json"

// chamando o construtor do express
const app = express()
// middleware do JSON para trabalhar com JSON
app.use(express.json())

// rota do barra passando função de middleware - req (requisição)/ res (resposta) parâmetros 
// no req chega o parâmetro que enviarmos no body, na URL
// na res podemos devolver um status ou um mensagem
app.get("/", (req, res,) => {
  try{
    res.send("Hello World!")
  } catch(err){
    throw new Error("Favor confirmar a URL")
  }
})

app.listen(3000,  async () => {
  const initialJson = {
    nextId : 1,
    lancamentos : []
  };
  // pesquisar a flag wx na documentação oficial do writeFile
  await writeFile(global.fileName, JSON.stringify(initialJson), { flag: "wx"})
  console.log("API Started!")
})