## Fullstack Social App

### MongoDB, Express, React, Nodejs

## to do:

### Backend

-   [x] server and connection with database
-   [x] model for user: username, password, fullName, email, followers, following, profileImg, bio, link, likedPosts, timestamps
-   [x] model for posts: user, image, text, likes, comments: (text, user, createdAt), timestamps
-   [x] model for notifications: fromUser, toUser, type: (follow, like, comment), read, timestamps
-   [ ] middleware to protect routes from unauthorized users
-   [ ] routes for authentication: signup, login, logout, getAuthUser
-   [ ] routes for notifications: getAllNotifications, getSingleNotification, deleteNotifications, deleteSingleNotification
-   [ ] routes for posts: getAllPosts, getFollowedPosts, getLikedPosts, getUserPosts, createPost, toggleLikePost, commentOnPost, updatePost, deletePost
-   [ ] routes for user: getUserProfile, getSuggestedUsers, toggleFollowUser, updateUser
