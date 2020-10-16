import express from "express"
import { promises } from "fs"

const { writeFile, readFile } = promises

const router = express.Router();

router.post("/receita", async (req, res) => {
  try {
  const json = JSON.parse(await readFile("lancamentos.json"))

  const lancamento = {
    id : json.nextId,
    varlor : req.body.valor,
    categoria: req.body.categoria,
    data: req.body.data
  };
  json.lancamentos.push(lancamento);

  await writeFile(global.fileName, JSON.stringify(json, null, 2))
  res.send(lancamento)
  } catch(err) {
    res.status(400).send(err.message)
  }
})

export default router