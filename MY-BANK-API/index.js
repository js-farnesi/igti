import express from 'express';
import winston from 'winston';
import accountsRouter from './routes/accounts.js';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

global.fileName = 'accounts.json';

const { combine, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level} : ${message}`;
});

global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    //prettier-ignore
    new (winston.transports.Console)(),
    //prettier-ignore
    new (winston.transports.File)({ filename: 'my-bank-api.log' }),
  ],
  //prettier-ignore
  format: combine(
      label({ label: 'my-bank-api' }), 
      timestamp(),
      myFormat
    ),
});

const app = express();
app.use(express.json());

app.use('/account', accountsRouter);

app.listen(3000, async () => {
  try {
    await readFile(global.fileName);
    logger.info('API Started!');
  } catch (err) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };
    writeFile(global.fileName, JSON.stringify(initialJson))
      .then(() => {
        loger.info('API Started and File Created!');
      })
      .catch((err) => {
        logger.error(err);
      });
  }
});
