import { body } from 'express-validator';
import { handleValidateErrors } from '../utils/handle-validate-errors.js';

export const validateUpdateUser = [
    body('username')
        .optional()
        .isAlphanumeric()
        .withMessage('Username must contain only letters and numbers')
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters long')
        .isLength({ max: 15 })
        .withMessage('Username must be less than 15 characters'),
    body('fullName')
        .optional()
        .isLength({ min: 6 })
        .withMessage('Full name must be at least 6 characters long')
        .isLength({ max: 30 })
        .withMessage('Full name must be less than 30 characters long')
        .matches(/^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż\s]+$/)
        .withMessage('Full name must contain only letters and spaces'),
    body('email').optional().isEmail().withMessage('Invalid email format'),
    body('bio').optional().isLength({ max: 200 }).withMessage('Bio must not exceed 200 characters'),
    body('link').optional().isURL().withMessage('Invalid URL format'),
    body('profileImg')
        .optional()
        .matches(/^data:image\/[a-z]+;base64,.+$/)
        .withMessage('Invalid image format. Must be a base64-encoded image.'),
    body('currentPassword')
        .optional()
        .isLength({ min: 6 })
        .withMessage('Current password must be at least 6 characters long'),
    body('newPassword')
        .optional()
        .isLength({ min: 6 })
        .withMessage('New password must be at least 6 characters long')
        .isLength({ max: 30 })
        .withMessage('Password must not exceed 30 characters'),
    handleValidateErrors,
];
