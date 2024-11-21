import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const signup = async (req, res) => {
    try {
        // extract user data from request body
        const { fullName, username, email, password } = req.body;
        // check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'username is already taken' });
        }
        // check if email is already in use
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email is already taken' });
        }

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create and save the new user
        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        // generate a JWT token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        // set the token in a cookie
        res.cookie('jwt', token, {
            httpOnly: true, // prevent access via JavaScript
            secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
            sameSite: 'strict', // CSRF protection
        });

        // respond with success
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error in signup controller', error.message);
        res.status(500).json('Internal Server Error');
    }
};

export const login = async (req, res) => {
    try {
        // extract email and password from request body
        const { username, email, password } = req.body;

        // find user by email or username
        const user = await User.findOne({ $or: [{ email }, { username }] });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

        // generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // set token in a cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        // respond with success
        res.status(200).json({
            message: 'Logged in successfully',
            user: { id: user._id, username: user.username, email: user.email },
        });
    } catch (error) {
        console.error('Error in login controller', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
