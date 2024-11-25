import express from 'express';
import authMiddleware from '../middleware/auth-middleware.js';
import { createPost, deletePost, updatePost } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', authMiddleware, createPost);
router.delete('/:id', authMiddleware, deletePost);
router.put('/:id', authMiddleware, updatePost);

export default router;
