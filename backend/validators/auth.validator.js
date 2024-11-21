import { body, validationResult } from 'express-validator';

const handleValidateErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const validateSignup = [
    body('fullName')
        .notEmpty()
        .withMessage('Full name is required')
        .isLength({ min: 6 })
        .withMessage('Full name must be at least 6 characters long')
        .isLength({ max: 30 })
        .withMessage('Full name must be less than 30 characters long')
        .matches(/^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż\s]+$/)
        .withMessage('Full name must contain only letters and spaces'),

    body('username')
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters long')
        .isLength({ max: 15 })
        .withMessage('Username must be less than 15 characters long')
        .isAlphanumeric()
        .withMessage('Username must contain only letters and numbers'),
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .isLength({ max: 30 })
        .withMessage('Password must be less than 30 characters long'),
    handleValidateErrors,
];

export const validateLogin = [
    body('username').optional(),
    body('email').optional(),
    body('password').notEmpty().withMessage('Password is required'),
    body().custom((value, { req }) => {
        if (!req.body.username && !req.body.email) {
            throw new Error('Username or Email is required');
        }
        return true;
    }),
    handleValidateErrors,
];
