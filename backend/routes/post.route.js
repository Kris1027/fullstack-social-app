import express from 'express';
import authMiddleware from '../middleware/auth-middleware.js';
import { createPost, deletePost, getAllPosts, updatePost } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', authMiddleware, createPost);
router.delete('/:id', authMiddleware, deletePost);
router.put('/:id', authMiddleware, updatePost);
router.get('/all', authMiddleware, getAllPosts);

export default router;
