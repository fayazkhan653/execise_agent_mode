import express from 'express';

import { connectDatabase } from './config/database.js';
import apiRouter from './routes/api.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());
app.use((_request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  if (_request.method === 'OPTIONS') {
    response.sendStatus(204);
    return;
  }
  next();
});

app.use('/api', apiRouter);

connectDatabase()
  .then(() => {
    app.listen(port, () => console.log(`OctoFit API listening on port ${port}`));
  })
  .catch((error) => {
    console.error('Unable to start API:', error);
    process.exit(1);
  });
