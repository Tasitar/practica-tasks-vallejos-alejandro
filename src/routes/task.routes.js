import { Router } from "express";

const taskRoutes = Router();

taskRoutes.post("/tasks")//añadir una nueva tarea
taskRoutes.get("/tasks")//obtener todas las tareas
taskRoutes.get("/tasks/:id")//obtener una tarea por su id
taskRoutes.put("/task/:id")//actualizar una tarea por su id
taskRoutes.delete("/task/:id")//eliminar tarea por id



export { taskRoutes }