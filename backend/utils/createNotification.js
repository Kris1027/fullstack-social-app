import Notification from '../models/notification.model.js';

export const createNotification = async ({ fromUser, toUser, type, postId = null }) => {
    try {
        // create a new notification object
        const notification = new Notification({
            fromUser,
            toUser,
            type,
            postId,
        });

        // save the notification in the database
        await notification.save();
        console.log('Notification created successfully');
        return notification;
    } catch (error) {
        console.error('Error creating notifications', error);
    }
};
