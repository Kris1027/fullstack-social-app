import express from 'express';
import { getAuthUser, login, logout, signup } from '../controllers/auth.controller.js';
import authMiddleware from '../middleware/auth-middleware.js';
import { validateLogin, validateSignup } from '../validators/auth.validator.js';

const router = express.Router();

router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);
router.post('/logout', logout);
router.get('/user', authMiddleware, getAuthUser);

export default router;
