import express from 'express';
import authMiddleware from '../middleware/auth-middleware.js';
import {
    commentOnPost,
    createPost,
    deletePost,
    getAllPosts,
    getUserPosts,
    updatePost,
} from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', authMiddleware, createPost);
router.delete('/:id', authMiddleware, deletePost);
router.put('/:id', authMiddleware, updatePost);
router.get('/all', authMiddleware, getAllPosts);
router.get('/user/:userId', authMiddleware, getUserPosts);
router.post('/:id/comment', authMiddleware, commentOnPost);

export default router;