import { matchedData, validationResult } from "express-validator";
import { Task } from "../models/task.model.js"
import { user } from "../models/user.model.js";


export const newTask = async (req, res) => {
    try {
            const validateData = matchedData(req);
        
            console.log(validateData);

            const {title, description,isComplete, user_id} = validateData

        const newTask = await Task.create({
            title,
            description,
            isComplete: isComplete ?? false,
            user_id
        });

        return res.status(201).json({ ok: true, msg: "Tarea creada correctamente", newTask });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, msg: "Error al intentar crear una nueva tarea!!" });
    }
};


   export const getTasks = async (req, res) => {
        try {

            const tasks = await Task.findAll({
                include: [
                    {
                       model: user,
                       as: "user",
                       attributes: {
                        exclude:["password"]
                       }
                        
                    },
                ],
            });
            if (tasks.length === 0) {
                return res.status(200).json({ok: false, msg: "No hay tareas registradas"})
            }
            return res.status(200).json({ok: true, msg:"Tareas encontradas", tasks})

                

        }catch (error) {  

                console.error(error);
                return res.status(500).json({ok: false, msg: "Error interno del sistema"})
          }
    };



    export const getOneTask = async (req, res) => {
        try{
            const { id } = req.params;
            const task = await Task.findByPk(id, {
                include: [
                    {
                    model: user, as: "user",
                    attributes: {
                        exclude:["password"]
                    }
                }
            ]
            })
            if (!task) {
                return res.status(404).json({ ok: false, msg: "Tarea no encontrada" });
            }
             return res.status(200).json({ ok: true, task }) 


        } catch(error) {
            console.error(error);
            return res.status(500).json({ ok: false, msg: "Error interno del sistema" });

        }
    }


      export const updateTask = async (req, res) => {
        try {
            
            const validateData = matchedData(req,{locations:["body"]})
            const { id } = matchedData(req,{locations:["params"]});

        const taskToUpdate = await Task.findByPk(id);
            if (!taskToUpdate) {
                return res.status(404).json({ok: false, msg:"tarea no encontrada"})
            }
        

        await taskToUpdate.update(validateData)

            return res.status(200).json({
                ok: true,
                msg: "Tarea actualiza correctamente",
                task: taskToUpdate
            });

        } catch (error) {
            console.error(error);
             return res.status(500).json({ ok: false, msg: "Error interno del sistema" });
        }
    }


    export const deleteMovie = async (req, res) => {
        try {
            const { id } = req.params;
            const task = await Task.findByPk(id);
            if (!task) {
              return res.status(404).json({ ok: false, msg: "Tarea no encontrada" });
            }

            await task.destroy();
            return res.status(200).json({ ok: true, msg: "Tarea eliminada correctamente" });



        } catch {
           console.error(error);
           return res.status(500).json({ ok: false, msg: "Error interno del servidor" });
        }
    }