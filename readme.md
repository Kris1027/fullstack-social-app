## Fullstack Social App

### MongoDB, Express, React, Nodejs

## to do:

### Backend

-   [x] server and connection with database
-   [x] model for user: username, password, fullName, email, followers, following, profileImg, bio, link, likedPosts, timestamps
-   [x] model for posts: user, image, text, likes, comments: (text, user, createdAt), timestamps
-   [x] model for notifications: fromUser, toUser, type: (follow, like, comment), read, timestamps
-   [x] middleware to protect routes from unauthorized users
-   [x] routes for authentication and authorization: signup, login, logout, getAuthUser and validation
-   [ ] routes for posts: getAllPosts, getFollowedPosts, getLikedPosts, getUserPosts, createPost, toggleLikePost, commentOnPost, updatePost, deletePost
-   [ ] routes for user: getUserProfile, getSuggestedUsers, toggleFollowUser, updateUser
-   [ ] routes for notifications: getAllNotifications, getSingleNotification, deleteNotifications, deleteSingleNotification
