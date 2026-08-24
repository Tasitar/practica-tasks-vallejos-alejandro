import { body } from "express-validator";

const createTaskValidation = [
        body('title')
        .trim()
        .notEmpty().withMessage("El titulo es obligatorio")
        .isString().withMessage("")
        .isLength({max:100}).withMessage(""),

        body("description")
        .trim()
        .notEmpty().withMessage("")
        .isString().withMessage("")
        .isLength({max:100}).whitelist(""),

        body("isCompleye")
        .optional()
        .isBoolean().withMessage(""),

        body("user_id")
        .notEmpty().withMessage("")
        .isInt().withMessage("")
]