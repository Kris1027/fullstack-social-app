import Notification from '../models/notification.model.js';
import { handleControllerError } from '../utils/handle-controller-error.js';

export const getAllNotifications = async (req, res) => {
    try {
        // get the logged in user's ID from req.user
        const userId = req.user._id;

        // extract the query parameters for pagination
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        // fetch notifications for the user, sort by newest first and apply pagination
        const notifications = await Notification.find({ toUser: userId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit))
            .populate('fromUser', 'username fullName email');

        // count total notifications for pagination
        const totalNotifications = await Notification.countDocuments({ toUser: userId });

        // respond with notifications and pagination data
        res.status(200).json({
            message: 'Notifications fetched successfully',
            notifications,
            pagination: {
                totalNotifications,
                currentPage: Number(page),
                totalPages: Math.ceil(totalNotifications / limit),
            },
        });
    } catch (error) {
        handleControllerError('getAllNotifications', res, error);
    }
};

export const deleteAllNotifications = async (req, res) => {
    try {
        // get the logged in user's ID from req.user
        const userId = req.user._id;

        // delete all notifications for this user
        const result = await Notification.deleteMany({ toUser: userId });

        // respond with the count of deleted notifications
        res.status(200).json({
            message: 'All notifications deleted successfully',
            deletedCount: result.deletedCount,
        });
    } catch (error) {
        handleControllerError('deleteAllNotifications', res, error);
    }
};
