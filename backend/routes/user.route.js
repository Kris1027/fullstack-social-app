import express from 'express';
import authMiddleware from '../middleware/auth-middleware.js';

import {
    getSuggestedUsers,
    getUserProfile,
    toggleFollowUser,
    updateUser,
} from '../controllers/user.controller.js';
import { validateUpdateUser } from '../validators/user.validator.js';

const router = express.Router();

router.get('/suggested', authMiddleware, getSuggestedUsers);
router.put('/update', authMiddleware, validateUpdateUser, updateUser);
router.put('/:id/follow', authMiddleware, toggleFollowUser);
router.get('/:id', authMiddleware, getUserProfile);

export default router;
