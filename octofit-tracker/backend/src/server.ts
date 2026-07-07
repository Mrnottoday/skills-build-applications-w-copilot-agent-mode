import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import getApiBaseUrl from './config/apiBaseUrl';
import db from './config/database';
import apiRoutes from './routes/apiRoutes';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;
const apiBaseUrl = getApiBaseUrl();

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