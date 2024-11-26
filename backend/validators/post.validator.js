import { body } from 'express-validator';
import { handleValidateErrors } from '../utils/handle-validate-errors.js';

export const validateCreatePost = [
    body('image')
        .notEmpty()
        .withMessage('Image is required')
        .matches(/^data:image\/[a-z]+;base64,.+$/)
        .withMessage('Invalid image format. Must be a base64-encoded image'),
    body('text')
        .optional()
        .isLength({ max: 500 })
        .withMessage('Text must not exceed 500 characters'),
    handleValidateErrors,
];

export const validateUpdatePost = [
    body('text')
        .optional()
        .isLength({ max: 500 })
        .withMessage('Text must not exceed 500 characters'),
    body('image')
        .optional()
        .matches(/^data:image\/[a-z]+;base64,.+$/)
        .withMessage('Invalid image format. Must be a base64-encoded image'),
    handleValidateErrors,
];

export const validateCommentOnPost = [
    body('text')
        .notEmpty()
        .withMessage('Comment text is required')
        .isLength({ max: 500 })
        .withMessage('Comment text must not exceed 500 characters'),
    handleValidateErrors,
];
