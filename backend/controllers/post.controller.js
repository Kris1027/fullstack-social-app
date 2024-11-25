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

export const updatePost = async (req, res) => {
    try {
        // get the post ID from the URL parameters
        const { id: postId } = req.params;

        // get the user ID from the req.user object
        const userId = req.user._id;

        // extract new data from the request body
        const { text, image } = req.body;

        // find the post in the database
        const post = await Post.findById(postId);

        // check if post exists
        if (!post) return res.status(404).json({ message: 'Post not found' });

        // verify that the user is the owner of the post
        if (post.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You are not authorized to update this post' });
        }

        // update the image if a new one is provided
        if (image) {
            // remove the old image from cloudinary if it exists
            if (post.image) {
                const publicId = post.image.split('/').pop()?.split('.')[0];
                await cloudinary.uploader.destroy(`fullstack-social-app/${publicId}`);
            }
            // upload the new image to cloudinary
            const uploadResult = await cloudinary.uploader.upload(image, {
                folder: 'fullstack-social-app',
            });

            // update the post's image URL
            post.image = uploadResult.secure_url;
        }

        // update the post's text if provided
        if (text) {
            post.text = text;
        }

        // save the updated post
        await post.save();

        // return the updated post
        res.status(200).json({ message: 'Post updated successfully', post });
    } catch (error) {
        handleControllerError('updatePost', res, error);
    }
};

export const getAllPosts = async (req, res) => {
    try {
        // extract query parameters for pagination
        const { page = 1, limit = 10 } = req.query;

        // calculate the number of posts to skip
        const skip = (page - 1) * limit;

        // find all posts, populate user data and apply pagination
        const posts = await Post.find()
            .sort({ createdAt: -1 }) // sort posts by creation date (newest first)
            .skip(skip) // skip posts for pagination
            .limit(Number(limit)) // limit the number of posts per page
            .populate('user', 'username fullName email'); // populate user data (exclude password)

        // count total posts for pagination
        const totalPosts = await Post.countDocuments();

        // return the posts and pagination data
        res.status(200).json({
            message: 'Posts fetched successfully',
            posts,
            pagination: {
                totalPosts,
                currentPage: Number(page),
                totalPages: Math.ceil(totalPosts / limit),
            },
        });
    } catch (error) {
        handleControllerError('getAllPosts', res, error);
    }
};

export const getUserPosts = async (req, res) => {
    try {
        // get the user ID from the URL parameters
        const { userId } = req.params;

        // extract query parameters for pagination
        const { page = 1, limit = 10 } = req.query;

        // calculate the number of posts to skip for pagination
        const skip = (page - 1) * limit;

        // find posts by the user, apply pagination and sorting
        const posts = await Post.find({ user: userId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit))
            .populate('user', 'username fullName email');

        // count total posts for this user
        const totalPosts = await Post.countDocuments({ user: userId });

        // return the user's posts and pagination data
        res.status(200).json({
            message: 'User posts fetched successfully',
            posts,
            pagination: {
                totalPosts,
                currentPage: Number(page),
                totalPages: Math.ceil(totalPosts / limit),
            },
        });
    } catch (error) {
        handleControllerError('getUserPosts', res, error);
    }
};
