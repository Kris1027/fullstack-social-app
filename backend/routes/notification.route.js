import express from 'express';
import authMiddleware from '../middleware/auth-middleware.js';
import {
    deleteAllNotifications,
    getAllNotifications,
} from '../controllers/notification.controller.js';

const router = express.Router();

router.get('/', authMiddleware, getAllNotifications);
router.delete('/delete', authMiddleware, deleteAllNotifications);

export default router;
