import Post from '../models/post.model.js';
import User from '../models/user.model.js';

import { handleControllerError } from '../utils/handle-controller-error.js';

export const toggleFollowUser = async (req, res) => {
    try {
        // get the target user ID from the URL parameters
        const { id: targetUserId } = req.params;

        // get the ID of the logged in user from req.user
        const userId = req.user._id;

        // prevent users from following themselves
        if (targetUserId === userId.toString()) {
            return res.status(400).json({ message: "You can't follow yourself" });
        }

        // find both users in the database
        const targetUser = await User.findById(targetUserId);
        const currentUser = await User.findById(userId);
        if (!targetUser) return res.status(404).json({ message: 'Target user not found' });

        // check if the current user is already following the target user
        const isFollowing = currentUser.following.includes(targetUserId);
        if (isFollowing) {
            // if already following, unfollow the user
            currentUser.following = currentUser.following.filter(
                (id) => id.toString() !== targetUserId
            );
            targetUser.followers = targetUser.followers.filter(
                (id) => id.toString() !== userId.toString()
            );
        } else {
            // if not following, follow the user
            currentUser.following.push(targetUserId);
            targetUser.followers.push(userId);
        }

        // save the both users
        await currentUser.save();
        await targetUser.save();

        // respond with the updated followers and following counts
        res.status(200).json({
            message: isFollowing ? 'Unfollowed user successfully' : 'Followed user successfully',
            followersCount: targetUser.followers.length,
            followingCount: currentUser.following.length,
        });
    } catch (error) {
        handleControllerError('toggleFollowUser', res, error);
    }
};

export const getUserProfile = async (req, res) => {
    try {
        // get the user ID from the URL parameters
        const { id: userId } = req.params;

        // find the user in database
        const user = await User.findById(userId)
            .select('-password')
            .populate('followers', 'username fullName email')
            .populate('following', 'username fullName email');
        if (!user) return res.status(404).json({ message: 'User not found' });

        // extract pagination query parameters for user's posts
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        // find the posts created by this user
        const posts = await Post.find({ user: userId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit))
            .populate('comments.user', 'username fullName email')
            .populate('likes', 'username fullName email');

        // count the total number of posts
        const totalPosts = await Post.countDocuments({ user: userId });

        // respond with the user's profile data na posts
        res.status(200).json({
            message: 'User profile fetched successfully',
            profile: {
                username: user.username,
                fullName: user.fullName,
                email: user.email,
                bio: user.bio,
                link: user.link,
                profileImg: user.profileImg,
                followers: user.followers,
                following: user.following,
            },
            posts,
            pagination: {
                totalPosts,
                currentPage: Number(page),
                totalPages: Math.ceil(totalPosts / limit),
            },
        });
    } catch (error) {
        handleControllerError('getUserProfile', res, error);
    }
};

export const getSuggestedUsers = async (req, res) => {
    try {
        // get the logged in user's ID from req.user
        const userId = req.user._id;

        // find the logged in user to get the list of following
        const loggedInUser = await User.findById(userId).select('following');
        if (!loggedInUser) return res.status(404).json({ message: 'User not found' });

        // extract the query parameters for pagination
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        // find users that the logged in user does not follow and exclude themselves
        const suggestedUsers = await User.find({
            _id: { $nin: [...loggedInUser.following, userId] }, // exclude following and self
        })
            .select('username fullName profileImg bio')
            .skip(skip) // apply pagination
            .limit(Number(limit)); // limit the number of users

        // count total suggested users
        const totalSuggestedUsers = await User.countDocuments({
            _id: { $nin: [...loggedInUser.following, userId] },
        });

        // respond with the suggested users and pagination data
        res.status(200).json({
            message: 'Suggested users fetched successfully',
            users: suggestedUsers,
            pagination: {
                totalUsers: totalSuggestedUsers,
                currentPage: Number(page),
                totalPages: Math.ceil(totalSuggestedUsers / limit),
            },
        });
    } catch (error) {
        handleControllerError('getSuggestedUsers', res, error);
    }
};
