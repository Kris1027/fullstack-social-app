import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';

import authRouter from './routes/auth.route.js';
import notificationRouter from './routes/notification.route.js';
import postRouter from './routes/post.route.js';
import userRouter from './routes/user.route.js';

import startServer from './server.js';

// load environment variables from a .env file into process.env
dotenv.config();

// create an instance of the express application
export const app = express();

// middleware to parse incoming JSON requests
app.use(express.json());
// middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));
// middleware to parse cookies in incoming requests, makes cookies available in 'req.cookies'
app.use(cookieParser());

// mount the routes
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/user', userRouter);
app.use('/api/notifications', notificationRouter);

startServer();
