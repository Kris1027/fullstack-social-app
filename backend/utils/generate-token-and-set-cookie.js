import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = async (userId, res) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
    } catch (error) {
        console.error('Error in generating token or setting cookie:', error.message);
        throw new Error('Could not generate token');
    }
};
