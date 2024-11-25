import express from 'express';
import authMiddleware from '../middleware/auth-middleware.js';

import { toggleFollowUser } from '../controllers/user.controller.js';

const router = express.Router();

router.put('/:id/follow', authMiddleware, toggleFollowUser);

export default router;
