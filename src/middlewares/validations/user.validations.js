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

    body("namePerson")
    .notEmpty()
    .withMessage("El nombre de la persona es obligatorio"),
    body("lastname")
    .notEmpty()
    .withMessage("El apellido de la persona es obligatorio  ")
]

