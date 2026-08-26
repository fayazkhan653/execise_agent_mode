import express from 'express';

import { connectDatabase } from './config/database.js';
import apiRouter from './routes/api.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

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
    app.listen(port, '0.0.0.0', () => {
      console.log(`OctoFit API listening at ${baseUrl}`);
    });
  })
  .catch((error) => {
    console.error('Unable to start API:', error);
    process.exit(1);
  });
