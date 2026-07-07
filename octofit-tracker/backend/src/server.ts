import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import db from './config/database';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  const mongoState = db.readyState === 1 ? 'connected' : 'disconnected';

  res.status(200).json({
    status: 'ok',
    service: 'octofit-backend',
    port,
    mongodb: mongoState,
  });
});

app.listen(port, () => {
  console.log(`OctoFit backend running on http://localhost:${port}`);
});