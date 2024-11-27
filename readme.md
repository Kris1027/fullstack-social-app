# Backend Tech Stack

## This project employs a modern and secure backend stack designed to handle user data efficiently, enable seamless API communication, and ensure scalability. Below is an overview of the chosen technologies for the backend.

---

## Core Technologies

-   [**Node.js**](https://nodejs.org/)
    A runtime environment that executes JavaScript code server-side, enabling high-performance and scalable applications.

-   [**Express.js**](https://expressjs.com/)
    A minimal and flexible Node.js web application framework for building RESTful APIs efficiently.

-   [**MongoDB**](https://www.mongodb.com/)
    A NoSQL database designed for flexibility and scalability, used for storing user data, posts, and notifications.

-   [**Mongoose**](https://mongoosejs.com/)
    An Object Data Modeling (ODM) library for MongoDB and Node.js, providing schema-based solutions to manage application data.

---

## Authentication and Authorization

-   [**jsonwebtoken**](https://github.com/auth0/node-jsonwebtoken)
    For generating and verifying JSON Web Tokens (JWT) to authenticate users securely.

-   [**bcryptjs**](https://github.com/dcodeIO/bcrypt.js)
    A library for hashing and validating passwords, ensuring secure user authentication.

-   [**cookie-parser**](https://github.com/expressjs/cookie-parser)
    Middleware for parsing and managing cookies in requests and responses.

---

## Validation and Error Handling

-   [**express-validator**](https://express-validator.github.io/docs/)
    A library for validating and sanitizing user inputs to ensure robust data handling and security.

-   **Custom Utility: handle-controller-error**
    A reusable utility for consistent error handling across all controllers.

---

## Cloud Storage

-   [**Cloudinary**](https://cloudinary.com/)
    For handling image uploads, storage, and optimization, ensuring seamless user profile and post image management.

---

## Cross-Origin Resource Sharing

-   [**CORS**](https://github.com/expressjs/cors)
    Middleware for enabling secure cross-origin resource sharing, allowing frontend applications to communicate with the backend.

---

## Environment Management

-   [**dotenv**](https://github.com/motdotla/dotenv)
    For managing environment variables and ensuring secure access to API keys and sensitive configurations.

---

## Development Tools

-   [**Nodemon**](https://nodemon.io/)
    A development utility that automatically restarts the server on file changes, improving productivity.

-   [**@types/express**](https://www.npmjs.com/package/@types/express) and [**@types/mongodb**](https://www.npmjs.com/package/@types/mongodb)
    TypeScript type definitions for Express.js and MongoDB to ensure type safety during development.

---

## Folder Structure

-   **Config**
    Contains configuration files, such as `cloudinary.js` and `db.js`, for managing external services and database connections.

-   **Controllers**
    Includes business logic for user management, post interactions, notifications, and authentication.

-   **Routes**
    Manages the API endpoints for users, posts, notifications, and authentication.

-   **Models**
    Defines MongoDB schemas and data models for users, posts, and notifications.

-   **Utils**
    Contains utility functions for notifications, error handling, and token generation.

-   **Validators**
    Implements middleware for input validation using `express-validator`.

---

## Why This Stack?

-   **Scalability**: Built to handle increasing user activity efficiently.
-   **Security**: Employs robust authentication, password hashing, and input validation.
-   **Developer Productivity**: Utilizes modular file structure and productivity-enhancing tools like Nodemon and dotenv.
-   **Cloud Integration**: Leverages Cloudinary for efficient media management.

This backend stack complements the frontend technologies seamlessly, ensuring a cohesive and robust application ecosystem.

# **Frontend Tech Stack**

This project uses a modern and scalable frontend stack tailored to provide an exceptional user and developer experience. Below is an overview of the technologies chosen for this application.

## **Core Technologies**

-   **[React](https://reactjs.org/)**
    A declarative JavaScript library for building user interfaces efficiently and effectively.

-   **[TypeScript](https://www.typescriptlang.org/)**
    Adds static typing to JavaScript, improving code reliability and maintainability.

-   **[Vite](https://vitejs.dev/)**
    A lightning-fast development build tool optimized for modern web applications.

## **Routing and Data Management**

-   **[TanStack Router](https://tanstack.com/router)**
    Provides a flexible and robust client-side routing solution for React applications.

-   **[TanStack Query](https://tanstack.com/query/latest)**
    Manages server-state, caching, and data synchronization, ensuring seamless interactions with APIs.

## **Styling and UI Framework**

-   **[Tailwind CSS](https://tailwindcss.com/)**
    A utility-first CSS framework that simplifies styling and speeds up development.

-   **[shadcn/ui](https://ui.shadcn.dev/)**
    A set of customizable pre-built components built with Tailwind CSS and Radix UI for building polished interfaces.

## **Forms and Validation**

-   **[react-hook-form](https://react-hook-form.com/)**
    Lightweight and performant library for managing forms and their validation.

-   **[zod](https://zod.dev/)**
    A schema-based validation library that integrates seamlessly with `react-hook-form` and TypeScript for runtime and compile-time validation.

## **Icons and Animations**

-   **[react-icons](https://react-icons.github.io/react-icons/)**
    A collection of popular, scalable vector icons for React applications.

-   **[motion](https://motion.dev/)**
    An alternative to Framer Motion for adding smooth and declarative animations to your UI.

## **Notifications**

-   **[react-hot-toast](https://react-hot-toast.com/)**
    Provides beautiful and customizable toast notifications with minimal effort.

## **Internationalization (Optional)**

-   **[i18next](https://www.i18next.com/)**
    Enables internationalization and supports localization for multi-language applications.

## **Error Tracking and Monitoring**

-   **[Sentry](https://sentry.io/)**
    Tracks errors, monitors performance, and simplifies debugging in production environments.

## **Testing**

-   **[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)**
    Focused on testing React components in a way that closely mimics user interactions.

## **Code Quality**

-   **[Prettier](https://prettier.io/)**
    Ensures consistent code formatting across the project.

-   **[ESLint](https://eslint.org/)**
    A tool to identify and fix problems in JavaScript code, enforcing best practices.

---

## **Why This Stack?**

This stack combines **performance**, **developer experience**, and **scalability**, making it suitable for modern web applications. It includes:

-   **Fast builds** and **real-time feedback** with Vite.
-   **Efficient state management** with TanStack Query and Router.
-   **Enhanced styling** with Tailwind CSS and `shadcn/ui`.
-   **Error tracking** and **testing tools** for reliability.

## **Steps to Build the Frontend**

### **1. Project Setup**

-   [ ] **Initialize the project:**
    -   Use `Vite` to create a new React + TypeScript project.
    -   Install `Tailwind CSS` following the official documentation.
    -   Set up `Prettier` for code formatting.
    -   Configure `ESLint` to enforce coding standards and best practices.
-   [ ] **Define folder structure:**
    -   Create a scalable folder structure:
        -   `src/components` - Reusable UI components.
        -   `src/pages` - Page components corresponding to routes.
        -   `src/hooks` - Custom hooks for reusable logic.
        -   `src/api` - API functions for backend communication.
        -   `src/utils` - Utility functions and helpers.

---

### **2. Authentication System**

-   [ ] **Build authentication pages:**
    -   Create `Login` and `Signup` forms using `react-hook-form` and `zod` for validation.
    -   Style the forms with `Tailwind CSS`.
-   [ ] **Set up API integration:**
    -   Connect forms to backend endpoints (`/api/auth/login`, `/api/auth/signup`) using `TanStack Query` for handling API requests.
    -   Display error messages for failed login/signup attempts.
-   [ ] **Implement authentication flow:**
    -   Use `TanStack Router` to create protected routes for logged-in users.
    -   Store and manage authentication tokens securely (e.g., in HTTP-only cookies).

---

### **3. User Interface and Profile**

-   [ ] **Navigation bar:**
    -   Add a responsive navigation bar with links to "Home," "Search," "Notifications," and "Profile."
    -   Highlight the active page dynamically.
-   [ ] **Profile page:**
    -   Display user details: profile picture, bio, link, followers, and following.
    -   Include a section to display the user's posts.
    -   Add an "Edit Profile" button for users to update their details.

---

### **4. Post Management**

-   [ ] **Home feed:**
    -   Fetch posts from followed users via the `/api/posts/followed` endpoint.
    -   Use `TanStack Query` for fetching and caching posts.
    -   Implement infinite scrolling for a seamless feed experience.
-   [ ] **Post interactions:**
    -   Allow users to like/unlike posts.
    -   Add a comments section with real-time updates when comments are added.
-   [ ] **Post creation and updates:**
    -   Build a "Create Post" modal with support for uploading images to Cloudinary.
    -   Implement edit and delete functionality for posts owned by the logged-in user.

---

### **5. Notifications**

-   [ ] **Notifications page:**
    -   Fetch and display notifications (likes, comments, follows) from `/api/notifications`.
    -   Mark notifications as "read" when viewed.
-   [ ] **Real-time notifications:**
    -   Use `react-hot-toast` to display in-app toast notifications for likes, comments, and follows.

---

### **6. Following System**

-   [ ] **Suggested users:**
    -   Create a page to display user recommendations fetched from `/api/users/suggested`.
    -   Include a "Follow" button for each suggested user.
-   [ ] **Follow/Unfollow users:**
    -   Add functionality to follow/unfollow users dynamically.
    -   Update the followers and following lists in real-time.

---

### **7. Search and Explore**

-   [ ] **Search functionality:**
    -   Add a search bar to find users by username or full name.
    -   Display search results with user profiles and a "Follow" button.
-   [ ] **Explore page:**
    -   Show trending or popular posts globally (from all users).
    -   Implement pagination for the explore feed.

---

### **8. Internationalization (Optional)**

-   [ ] Set up `i18next` for multi-language support.
-   [ ] Create a settings page to toggle between languages.
-   [ ] Add translations for text elements across the application.

---

### **9. Animations and UI Enhancements**

-   [ ] **Animations:**
    -   Use `motion` for smooth animations in transitions, modals, and buttons.
    -   Enhance user interaction with animated hover effects.
-   [ ] **UI components:**
    -   Integrate `shadcn/ui` for pre-built, customizable UI components styled with Tailwind CSS.

---

### **10. Error Tracking and Monitoring**

-   [ ] Configure `Sentry` to monitor and log frontend errors in production.
-   [ ] Test error handling for key user actions (e.g., login failures, API errors).

---

### **11. Testing**

-   [ ] **Write unit tests:**
    -   Use `React Testing Library` to test components.
    -   Cover core functionality like form validation, API calls, and user interactions.
-   [ ] **Integration tests:**
    -   Test critical flows such as login, signup, post creation, and notifications.
-   [ ] **E2E testing (Optional):**
    -   Consider tools like Cypress for end-to-end testing.

---

### **12. Deployment**

-   [ ] **Production build:**
    -   Use `Vite` to generate an optimized build of the application.
-   [ ] **Hosting:**
    -   Deploy the frontend to a platform like Vercel or Netlify.
-   [ ] **Environment variables:**
    -   Configure API URLs and other environment variables for production.
-   [ ] **Testing in production:**
    -   Verify that the frontend interacts seamlessly with the backend.

---

### **13. Bonus Features (Future Enhancements)**

-   [ ] **Stories feature:**
    -   Allow users to upload temporary images or videos, similar to Instagram Stories.
-   [ ] **Direct messaging:**
    -   Implement a private chat feature between users.
-   [ ] **Analytics dashboard:**
    -   Display insights like post engagement and follower growth.

---
