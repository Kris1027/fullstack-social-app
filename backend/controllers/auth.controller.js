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
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // only in production
            sameSite: 'strict', // access to cookies only from the same domain
        });

        // respond with success
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error in signup controller', error.message);
        res.status(500).json('Internal Server Error');
    }
};
