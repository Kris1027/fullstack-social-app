import express from 'express';
import authMiddleware from '../middleware/auth-middleware.js';
import {
    commentOnPost,
    createPost,
    deletePost,
    getAllPosts,
    getFollowedPosts,
    getLikedPosts,
    getUserPosts,
    toggleLikePost,
    updatePost,
} from '../controllers/post.controller.js';
import {
    validateCommentOnPost,
    validateCreatePost,
    validateUpdatePost,
} from '../validators/post.validator.js';

const router = express.Router();

router.post('/create', authMiddleware, validateCreatePost, createPost);
router.delete('/:id', authMiddleware, deletePost);
router.put('/:id', authMiddleware, validateUpdatePost, updatePost);
router.get('/all', authMiddleware, getAllPosts);
router.get('/user/:userId', authMiddleware, getUserPosts);
router.post('/:id/comment', authMiddleware, validateCommentOnPost, commentOnPost);
router.put('/:id/like', authMiddleware, toggleLikePost);
router.get('/followed', authMiddleware, getFollowedPosts);
router.get('/liked', authMiddleware, getLikedPosts);

export default router;
