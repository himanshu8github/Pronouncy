import express from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller.js';

const router = express.Router();


router.get('/test', (req, res) => {
  res.json({ message: "Auth route working!" });
});

// Signup Route
router.post('/signup', registerUser);

// Login Route
router.post('/login', loginUser);

export default router;
