import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    try {
        // check if cookie from token exists
        const token = req.cookies.jwt;
        if (!token) return res.status(401).json({ error: 'Unauthorized: No token provided' });

        // token verification
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Unauthorized: Token expired' });
            }
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }

        // fetching user from database
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        // assigning a user to the req object
        req.user = user;
        next();
    } catch (error) {
        console.error('Error in authMiddleware', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default authMiddleware;
