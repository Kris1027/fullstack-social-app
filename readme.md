## Fullstack Social App

## to do:

### Backend

-   [x] server and connection with database
-   [x] model for user: username, password, fullName, email, followers, following, profileImg, bio, link, likedPosts, timestamps
-   [x] model for posts: user, image, text, likes, comments: (text, user, createdAt), timestamps
-   [x] model for notifications: fromUser, toUser, type: (follow, like, comment), read, timestamps
-   [x] middleware to protect routes from unauthorized users
-   [x] routes for authentication and authorization: signup, login, logout, getAuthUser
-   [x] routes for posts: getAllPosts, getFollowedPosts, getLikedPosts, getUserPosts, createPost, toggleLikePost, commentOnPost, updatePost, deletePost
-   [x] routes for user: getUserProfile, getSuggestedUsers, toggleFollowUser, updateUser
-   [x] routes for notifications: getAllNotifications, deleteNotifications
-   [x] validation for auth
-   [x] validation for posts
-   [x] validation for user

## Frontend Tech Stack

### This project uses a modern and scalable frontend stack tailored to provide an exceptional user and developer experience. Below is an overview of the technologies chosen for this application.

### Core Technologies

-   React
    A declarative JavaScript library for building user interfaces efficiently and effectively.

-   TypeScript

### Adds static typing to JavaScript, improving code reliability and maintainability.

-   Vite
    A lightning-fast development build tool optimized for modern web applications.

### Routing and Data Management

-   TanStack Router
    Provides a flexible and robust client-side routing solution for React applications.

-   TanStack Query
    Manages server-state, caching, and data synchronization, ensuring seamless interactions with APIs.

### Styling and UI Framework

-   Tailwind CSS
    A utility-first CSS framework that simplifies styling and speeds up development.

-   shadcn/ui
    A set of customizable pre-built components built with Tailwind CSS and Radix UI for building polished interfaces.

### Forms and Validation

-   react-hook-form
    Lightweight and performant library for managing forms and their validation.

-   zod
    A schema-based validation library that integrates seamlessly with react-hook-form and TypeScript for runtime and compile-time validation.

### Icons and Animations

-   react-icons
    A collection of popular, scalable vector icons for React applications.

-   motion
    An alternative to Framer Motion for adding smooth and declarative animations to your UI.

### Notifications

-   react-hot-toast
    Provides beautiful and customizable toast notifications with minimal effort.

### Internationalization

-   i18next
    Enables internationalization and supports localization for multi-language applications.

### Error Tracking and Monitoring

-   Sentry
    Tracks errors, monitors performance, and simplifies debugging in production environments.

### Testing

-   React Testing Library
    Focused on testing React components in a way that closely mimics user interactions.

### Code Quality

-   Prettier
    Ensures consistent code formatting across the project.

-   ESLint
    A tool to identify and fix problems in JavaScript code, enforcing best practices.

### Why This Stack?

### This stack combines performance, developer experience, and scalability, making it suitable for modern web applications. It includes:

-   Fast builds and real-time feedback with Vite.
-   Efficient state management with TanStack Query and Router.
-   Enhanced styling with Tailwind CSS and shadcn/ui.
-   Error tracking and testing tools for reliability.
