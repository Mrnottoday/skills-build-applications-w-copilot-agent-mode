import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import db from './config/database';
import apiRoutes from './routes/apiRoutes';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const apiBaseUrl = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);

app.get('/api/health', (_req, res) => {
  const mongoState = db.readyState === 1 ? 'connected' : 'disconnected';

  res.status(200).json({
    status: 'ok',
    service: 'octofit-backend',
    port,
    apiBaseUrl,
    mongodb: mongoState,
  });
});

app.listen(port, () => {
  console.log(`OctoFit backend running on ${apiBaseUrl}`);
});