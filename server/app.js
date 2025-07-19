import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import historyRoutes from './routes/history.routes.js';
import errorHandler from './middleware/error.handler.js';
import progressRoute from "./routes/progress.route.js";

dotenv.config();

const app = express();


app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true, 
}));
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api', historyRoutes);
app.use("/api/progress", progressRoute);


app.use(errorHandler);

export default app;
