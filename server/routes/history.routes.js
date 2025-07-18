import express from 'express';
import { getHistory, addHistory } from '../controllers/history.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();


router.get('/getHistory', authMiddleware, getHistory);

router.post('/addHistory', authMiddleware, addHistory);

export default router;
