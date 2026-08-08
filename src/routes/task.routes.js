import { Router } from "express";
import { newTask, getTasks,getOneTask, updateTask, deleteMovie } from "../controllers/task.controller.js";


const taskRoutes = Router();


taskRoutes.post("/tasks", newTask)//añadir una nueva tarea
taskRoutes.get("/tasks", getTasks)//obtener todas las tareas
taskRoutes.get("/tasks/:id", getOneTask)//obtener una tarea por su id
taskRoutes.put("/tasks/:id", updateTask)//actualizar una tarea por su id
taskRoutes.delete("/tasks/:id", deleteMovie)//eliminar tarea por id



export { taskRoutes }

