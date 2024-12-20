import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
    {
        fromUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        toUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: ['follow', 'like', 'comment'],
        },
        isRead: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
