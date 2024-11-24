import cloudinary from '../config/cloudinary.js';
import Post from '../models/post.model.js';
import { handleControllerError } from '../utils/handle-controller-error.js';

export const createPost = async (req, res) => {
    try {
        // extract post data from the request body
        const { image, text } = req.body;

        // get the user ID from the req.user object (assumes authMiddleware is in place)
        const userId = req.user._id;

        // validate required fields
        if (!image) return res.status(400).json({ message: 'Image is required' });

        // check the text length
        if (text && text.length > 500)
            return res.status(400).json({ message: 'Text must not exceed 500 characters' });

        // check if image is in base64 format
        if (!image.startsWith('data:image/'))
            return res
                .status(400)
                .json({ message: 'Invalid image format. Must be base64-encoded image.' });

        // check if image size is less then 5mb
        const imageSize = Buffer.byteLength(image, 'base64') / (1024 * 1024);
        if (imageSize > 5)
            return res.status(400).json({ message: 'Image size exceeds the 5mb limit' });

        // upload the image to cloudinary
        const uploadResult = await cloudinary.uploader.upload(image, {
            folder: 'fullstack-social-app',
        });

        // create a new post
        const newPost = new Post({
            user: userId,
            image: uploadResult.secure_url, // URL of the uploaded image
            text,
            like: [],
            comments: [],
        });

        // save the posts to the database
        await newPost.save();

        // return newly created post
        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        handleControllerError('createPost', res, error);
    }
};

export const deletePost = async (req, res) => {
    try {
        // get the post ID from the URL parameters
        const { id: postId } = req.params;

        // get the userID from the req.user object
        const userId = req.user._id;

        // find the post in the database
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        // verify that the user is the owner of the post
        if (post.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You are not authorized to delete this post' });
        }

        // remove the image from cloudinary if it exists
        if (post.image) {
            const publicId = post.image.split('/').pop().split('.')[0]; // extract public_id from the image URL
            await cloudinary.uploader.destroy(`fullstack-social-app/${publicId}`);
        }

        // remove the post from the database
        await post.deleteOne();

        // return a success response
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        handleControllerError('deletePost', res, error);
    }
};
