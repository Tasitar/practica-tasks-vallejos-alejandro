import { body, param } from "express-validator";
import { Task } from "../../models/task.model.js";
import { user } from "../../models/user.model.js";
// import { where } from "sequelize";

export const createTaskValidation = [
        body("title")
        .notEmpty().withMessage("El titulo es obligatorio")
        .isString().withMessage("El titulo tiene que ser string")
        .isLength({max:100}).withMessage("El titulo no tiene que pasar los 100 caracteres")
        .custom(async (title) => {
        const existingTask = await Task.findOne({ where: { title: title } });
        
                if (existingTask) {
                    throw new Error("esta tarea ya fue creada")
                }
                return true;
        })
        .custom(async (id) => {
                console.log(id);
        const existingUser = await user.findOne({ where: { id: id } });
        
                if (!existingUser) {
                    throw new Error("El usuario no existe")
                }
                return true;
        }),
        


        body("description")
        .trim()
        .notEmpty().withMessage("la descripcion es obligatorio")
        .isString().withMessage("La descripcion tiene que ser string")
        .isLength({max:100}).whitelist("La descripcion no tiene que pasar los 100 caracteres"),

        body("isComplete")
        .optional()
        .isBoolean().withMessage("isComplete tiene que ser boolean"),

        body("user_id")
        .notEmpty().withMessage("")
        .isInt().withMessage("user_id tiene que ser integer")
]

export const updateTaskValidation = [

        param("id")
        .isInt().withMessage('el id de la tarea debe ser un numero entero'),

        body("title")
        .trim()
        .notEmpty().withMessage("El titulo es obligatorio")
        .optional()
        .isString().withMessage("El titulo tiene que ser string")
        .isLength({max:100}).withMessage("El titulo no tiene que pasar los 100 caracteres")
        .custom(async (title) => {
                const existingTask = await Task.findOne({ where: { title }});
                
                if (existingTask){
                        throw new Error("ya existe una trea con ese titulo")
                }
               return true
        }),
        body('description')
        .trim()
        .optional()
        .notEmpty().withMessage('title y description son obligatorios')
        .isString().withMessage('description debe ser un texto')
        .isLength({ max: 100 }).withMessage('description no debe superar los 100 caracteres'),


        body('isComplete')
        .optional()
        .isBoolean().withMessage('isComplete debe ser un valor booleano')

]