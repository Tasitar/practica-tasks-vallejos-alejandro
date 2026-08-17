import { Router } from "express";
import { deleteUsers, getOneUser, getUsers, newUser, updateUsers } from "../controllers/user.controller.js";


const userRoutes = Router()


userRoutes.post("/users",newUser)//añadir una nueva tarea
userRoutes.get("/users",getUsers)//obtener todas las tareas
userRoutes.get("/users/:id",getOneUser)//obtener una tarea por su id
userRoutes.put("/users/:id",updateUsers)//actualizar una tarea por su id
userRoutes.delete("/users/:id",deleteUsers)//eliminar tarea por id

export { userRoutes }