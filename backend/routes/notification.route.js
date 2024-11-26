import express from 'express';
import authMiddleware from '../middleware/auth-middleware.js';
import { getAllNotifications } from '../controllers/notification.controller.js';

const router = express.Router();

router.get('/', authMiddleware, getAllNotifications);

export default router;
