import { body, param } from "express-validator";

export const createSocialValidation = [
    body('red_secial')
        .notEmpty()
        .withMessage('el campo no debe estar vacio')
        .isLength({max:30})
        .withMessage('El nombre de la red social no debe superar los 30 caracteres'),
    body('user_name')
        .notEmpty()
        .withMessage('el campo no debe estar vacio')
        .isLength({max:20})
        .withMessage('El nombre de usuario no debe superar los 30 caracteres'),
]

export const updateSocialValidation = [
    param('id')
        .notEmpty()
        .withMessage('El ID del usuario es obligatorio'),
    body('red_secial')
        .optional()
        .notEmpty()
        .withMessage('el campo no debe estar vacio')
        .isLength({max:30})
        .withMessage('El nombre de la red social no debe superar los 30 caracteres'),
    body('user_name')
        .optional()
        .notEmpty()
        .withMessage('el campo no debe estar vacio')
        .isLength({max:20})
        .withMessage('El nombre de usuario no debe superar los 30 caracteres'),
]