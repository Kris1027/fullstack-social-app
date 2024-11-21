## Fullstack Social App

### MongoDB, Express, React, Nodejs

## to do:

### Backend

-   [ ] model for user: username, password, fullName, email, followers, following, profileImg, bio, link, likedPosts, timestamps
-   [ ] model for posts: user, image, text, likes, comments, timestamps
-   [ ] model for notifications: fromUser, toUser, type: (follow, like), read, timestamps
-   [ ] routes for authentication: signup, login, logout, getAuthUser
-   [ ] routes for notifications: getAllNotifications, getSingleNotification, deleteNotifications, deleteSingleNotification
-   [ ] routes for posts: getAllPosts, getFollowedPosts, getLikedPosts, getUserPosts, createPost, toggleLikePost, commentOnPost, updatePost, deletePost
-   [ ] routes for user: getUserProfile, getSuggestedUsers, toggleFollowUser, updateUser
