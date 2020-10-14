import express from 'express';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;
global.fileName = 'accounts.json';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    let account = req.body;
    //const data = await readFile('account.json');
    //console.log(data);
    //const json = JSON.parse(data);
    const data = JSON.parse(await readFile(global.fileName));
    // console.log(json);

    // account.id = data.nextId;
    // data.nextId++;
    // data.accounts.push(account);
    // para mudar a ordem do ID e fazendo o incremento do (ao final) podemos fazer um spread do account
    account = { id: data.nextId++, ...account };
    data.accounts.push(account);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(account);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get('/', async (_req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    delete data.nextId;
    res.send(data);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
