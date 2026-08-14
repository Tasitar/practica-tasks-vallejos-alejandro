import { Router } from "express";
import { newTask, getTasks, getOneTask,updateTask,deleteMovie } from "../controllers/task.controller.js";

const userRoutes = Router()


userRoutes.post("/users",newTask )//añadir una nueva tarea
userRoutes.get("/users",getTasks )//obtener todas las tareas
userRoutes.get("/users/:id",getOneTask )//obtener una tarea por su id
userRoutes.put("/users/:id", updateTask)//actualizar una tarea por su id
userRoutes.delete("/users/:id", deleteMovie)//eliminar tarea por id

export { userRoutes }