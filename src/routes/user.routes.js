import { Router } from "express";
import { deleteUsers, getOneUser, getUsers, newUser, updateUsers } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.js";
import { newUserValidation } from "../middlewares/validations/user.validations.js";

const userRoutes = Router()


userRoutes.post("/users",newUserValidation,validate,newUser)//añadir una nueva tarea
userRoutes.get("/users",getUsers)//obtener todas las tareas
userRoutes.get("/users/:id",getOneUser)//obtener una tarea por su id
userRoutes.put("/users/:id",updateUsers)//actualizar una tarea por su id
userRoutes.delete("/users/:id",deleteUsers)//eliminar tarea por id
export { userRoutes }