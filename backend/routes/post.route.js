import express from 'express';
import authMiddleware from '../middleware/auth-middleware.js';
import { createPost, deletePost } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', authMiddleware, createPost);
router.delete('/:id', authMiddleware, deletePost);

export default router;
