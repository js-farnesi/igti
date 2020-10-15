import express from 'express';
import { promises as fs } from 'fs';

const router = express.Router();

const { readFile, writeFile } = fs;

router.post('/', async (req, res) => {
  try {
    let grade = req.body;
    // console.log(grade);
    // res.end();

    const json = JSON.parse(await readFile(global.fileName, 'utf8'));

    grade = { id: json.nextId++, timestamp: new Date(), ...grade };

    json.grades.push(grade);

    await writeFile(global.fileName, JSON.stringify(json));

    res.send(grade);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const json = JSON.parse(await readFile(global.fileName, 'utf8'));

    let grade = json.grades.find(
      (grade) => grade.id === parseInt(req.params.id, 10)
    );

    if (grade) {
      res.send(grade);
    } else {
      throw new Error('ID não existente.');
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.put('/', async (req, res) => {
  try {
    let newGrade = req.body;

    const json = JSON.parse(await readFile(global.fileName, 'utf8'));
    let index = json.grades.findIndex((grade) => grade.id === newGrade.id);

    if (index === -1) {
      throw new Error('ID não existente');
    }
    if (newGrade.student) {
      json.grades[index].student = newGrade.student;
    }
    if (newGrade.subject) {
      json.grades[index].subject = newGrade.subject;
    }
    if (newGrade.type) {
      json.grades[index].type = newGrade.type;
    }
    if (newGrade.value) {
      json.grades[index].value = newGrade.value;
    }

    await writeFile(global.fileName, JSON.stringify(json));

    res.send(json.grades[index]);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const json = JSON.parse(await readFile(global.fileName, 'utf8'));

    let index = json.grades.findIndex(
      (grade) => grade.id === parseInt(req.params.id, 10)
    );

    if (index === -1) {
      throw new Error('ID não existente');
    }

    // o id do req.params.id é string por isso fazermos um parseInt na base 10
    // const grades = json.grades.filter(
    //   (grade) => grade.id !== parseInt(req.params.id, 10)
    // );
    json.grades.splice(index, 1);
    // json.grades = grades;

    await writeFile(global.fileName, JSON.stringify(json));
    res.send(` Index: ${index + 1} deletado`);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.post('/totalGrades', async (req, res) => {
  try {
    const json = JSON.parse(await readFile(global.fileName, 'utf8'));
    const grades = json.grades.filter(
      (grade) =>
        grade.student === req.body.student && grade.subject === req.body.subject
    );
    const total = grades.reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);
    // temos que retornar um JSON
    res.send({ total });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get('/avg/:subject/:type', async (req, res) => {
  try {
    // console.log(req.params.subject);
    // console.log(req.params.type);

    const json = JSON.parse(await readFile(global.fileName, 'utf8'));
    const grades = json.grades.filter(
      (grade) =>
        grade.subject === req.params.subject && grade.type === req.params.type
    );
    // se não colocamos o .length retorna null, pois 0 é false e a negação de falso é verdadeiro, então entra na condição
    if (!grades.length) {
      throw new Error(`Não foram encontrados registros, com os parâmetros informados 
Você está pesquisando por:
Subject: ${req.params.subject} 
Type: ${req.params.type}
Certifique-se que esteja correto e tente novamente`);
    }

    const total = grades.reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);
    //res.send(grades);
    res.send({ avg: total / grades.length });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.post('/topGrades', async (req, res) => {
  try {
    const json = JSON.parse(await readFile(global.fileName, 'utf8'));
    const grades = json.grades.filter(
      (grade) =>
        grade.subject === req.body.subject && grade.type === req.body.type
    );
    if (!grades.length) {
      throw new Error(
        `Não foram encontrados registros, com os parâmetros informados`
      );
    }

    grades.sort((a, b) => {
      return b.value - a.value;
    });
    // grades.sort((a, b) => {
    //   if (b.value < a.value) return 1;
    //   else if (a.value > b.value) return -1;
    //   else return 0;
    // });
    res.send(grades.slice(0, 3));
    // res.send(grades);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
