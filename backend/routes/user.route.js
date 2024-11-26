import express from 'express';
import authMiddleware from '../middleware/auth-middleware.js';

import { getUserProfile, toggleFollowUser } from '../controllers/user.controller.js';

const router = express.Router();

router.put('/:id/follow', authMiddleware, toggleFollowUser);
router.get('/:id', authMiddleware, getUserProfile);

export default router;
