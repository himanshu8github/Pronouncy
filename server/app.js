import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import historyRoutes from './routes/history.routes.js';
import errorHandler from './middleware/error.handler.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api', historyRoutes);


app.use(errorHandler);

export default app;
