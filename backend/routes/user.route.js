import express from 'express';
import authMiddleware from '../middleware/auth-middleware.js';

import {
    getSuggestedUsers,
    getUserProfile,
    toggleFollowUser,
    updateUser,
} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/suggested', authMiddleware, getSuggestedUsers);
router.put('/update', authMiddleware, updateUser);
router.put('/:id/follow', authMiddleware, toggleFollowUser);
router.get('/:id', authMiddleware, getUserProfile);

export default router;
