import bcrypt from 'bcryptjs';

import Post from '../models/post.model.js';
import User from '../models/user.model.js';

import { generateTokenAndSetCookie } from '../utils/generate-token-and-set-cookie.js';
import { handleControllerError } from '../utils/handle-controller-error.js';

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

        // generate a JWT token and set the token in a cookie
        generateTokenAndSetCookie(newUser._id, res);

        // remove the password before sending the response to the client
        const { password: _, ...userWithoutPassword } = newUser._doc;
        // respond with success
        res.status(201).json({
            message: 'User registered successfully',
            user: userWithoutPassword,
        });
    } catch (error) {
        handleControllerError('signup', res, error);
    }
};

export const login = async (req, res) => {
    try {
        // extract user data from request body
        const { username, email, password } = req.body;

        // find user by email or username
        const user = await User.findOne({ $or: [{ email }, { username }] });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

        // generate a JWT token and set the token in a cookie
        generateTokenAndSetCookie(user._id, res);

        // respond with success
        res.status(200).json({
            message: 'Logged in successfully',
            user: { id: user._id, username: user.username, email: user.email },
        });
    } catch (error) {
        handleControllerError('login', res, error);
    }
};

export const logout = async (req, res) => {
    try {
        // clear the JWT cookie
        res.clearCookie('jwt', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        // respond with success
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        handleControllerError('logout', res, error);
    }
};

export const getAuthUser = async (req, res) => {
    try {
        // fetch the authenticated user with populated fields
        const authUser = await User.findById(req.user._id)
            .populate('followers', 'username fullName email')
            .populate('following', 'username fullName email');

        if (!authUser) return res.status(404).json({ message: 'Authenticated user not found' });

        // respond with the user details including populated fields
        res.status(200).json(authUser);
    } catch (error) {
        handleControllerError('getAuthUser', res, error);
    }
};
