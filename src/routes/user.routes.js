import { Router } from "express";
import { user } from "../models/user.model";

const userRoutes = Router()


userRoutes.post("/users", )//añadir una nueva tarea
userRoutes.get("/users", )//obtener todas las tareas
userRoutes.get("/users/:id", )//obtener una tarea por su id
userRoutes.put("/users/:id")//actualizar una tarea por su id
userRoutes.delete("/users/:id")//eliminar tarea por id
