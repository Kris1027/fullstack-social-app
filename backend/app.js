import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import startServer from './server.js';

dotenv.config();

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

startServer();
