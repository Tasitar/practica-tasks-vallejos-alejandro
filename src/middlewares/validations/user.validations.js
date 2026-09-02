import { body, param } from "express-validator";
import { user } from "../../models/user.model.js";
//datos pal thunder
// {
  
//   "name":"con validator",
//   "email":"manolos@live.es",
//   "password":"socialrut",
//   "namePerson":"hideo",
//   "lastname":"kojima"
// }

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


export const updateUserValidation = [
    param("id")
    .isInt().withMessage('el id debe ser un numero entero'),

    body("name")
    .trim()
    .notEmpty().withMessage("el nombre no puede estar vacio")
    .optional()
    .isString().withMessage("El nombre tiene que ser un string"),

    body("email")
    .optional()
    .notEmpty().withMessage("El correo electronico no debe estar vacio")
    .isEmail().withMessage("el correo electronico debe ser valido")
    .custom(async (email) => {
                    const existingEmail = await user.findOne({ where: { email }});
                    
                    if (existingEmail){
                            throw new Error("ese correo ya existe / esta registrado")
                    }
                   return true
            }),

     body("password")
    .notEmpty()
    .optional()
    .withMessage("La password no debe ser vacia"),

    // body("namePerson")
    // .optional()
    // .notEmpty()
    // .withMessage("El nombre de la persona es obligatorio"),
    // body("lastname")
    // .optional()
    // .notEmpty()
    // .withMessage("El apellido de la persona es obligatorio  ")   
]
