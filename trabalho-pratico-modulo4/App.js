import express from 'express';
import { accountRouter } from './routes/accountRouter.js';

import { db } from './models/index.js';

(async () => {
  try {
    console.log('Connecting MongoDB...');
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.log('Error connecting MongoDB.' + error);
  }
})();

const app = express();

app.use(express.json());
app.use(accountRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log('Api Bank Started...');
});
