import express from 'express';
import authMiddleware from '../middleware/auth-middleware.js';
import { createPost } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', authMiddleware, createPost);

export default router;
