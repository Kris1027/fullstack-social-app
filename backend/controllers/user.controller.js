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
