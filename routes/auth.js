import express from 'express';
const router = express.Router();
import { register, login } from '../controllers/auth.js';

router.post('/register', register).post('/login', login);

export default router;
