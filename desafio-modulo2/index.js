import express from 'express';
import gradesRouter from './routes/grades.js';

const app = express();

// se não colocamos esta linha com o express.json não pega a requisição do body
app.use(express.json());
global.fileName = 'grades.json';

app.use('/grade', gradesRouter);
app.listen(3000, () => {
  console.log('API Started!');
});
