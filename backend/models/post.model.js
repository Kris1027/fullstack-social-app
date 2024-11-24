import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        text: {
            type: String,
        },
        likes: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'User',
            required: true,
        },
        comments: [
            {
                text: {
                    type: String,
                    required: true,
                },
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
