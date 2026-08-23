import { body } from "express-validator";

export const newUserValidation = [
    body("name")
    .notEmpty()
    .withMessage("El name no debe ser vacio"),
    body("email")
    .notEmpty()
    .withMessage("El email debe ser valido")
    .isEmail()
    .withMessage("El email debe ser valido"),
    body("password")
    .notEmpty()
    .withMessage("La password no debe ser vacia"),
    body("person_id")
    .notEmpty()
    .withMessage("El person_id no debe ser vacio"),
]