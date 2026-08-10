import { Task } from "../models/task.model.js"


export const newTask = async (req, res) => {
    try {
        const { title, description, isComplete } = req.body;

        if (!title || !description) {
            return res.status(400).json({ ok: false, msg: "title y description son obligatorios" });
        }

        if (typeof title !== "string" || title.trim().length === 0 || title.length > 100) {
            return res.status(400).json({ ok: false, msg: "title debe ser una cadena no vacía de máximo 100 caracteres" });
        }

        if (typeof description !== "string" || description.trim().length === 0 || description.length > 100) {
            return res.status(400).json({ ok: false, msg: "description debe ser una cadena no vacía de máximo 100 caracteres" });
        }

        if (isComplete !== undefined && typeof isComplete !== "boolean") {
            return res.status(400).json({ ok: false, msg: "isComplete debe ser un valor booleano" });
        }

        const existingTask = await Task.findOne({ where: { title } });
        if (existingTask) {
            return res.status(400).json({ ok: false, msg: "Ya existe una tarea con ese title" });
        }

        const newTask = await Task.create({
            title,
            description,
            isComplete: isComplete ?? false,
        });

        return res.status(201).json({ ok: true, msg: "Tarea creada correctamente", newTask });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, msg: "Error interno del servidor" });
    }
};


   export const getTasks = async (req, res) => {
        try {

            const tasks = await Task.findAll();
            if (tasks.length === 0) {
                return res.status(200).json({ok: false, msg: "No hay tareas registradas"})
            }
            return res.status(200).json({ok: true, msg:"Peliculas encontradas", tasks})

                

        }catch (error) {  

                console.error(error);
                return res.status(500).json({ok: false, msg: "Error interno del sistema"})
          }
    };



    export const getOneTask = async (req, res) => {
        try{
            const { id } = req.params;
            const task = await Task.findByPk(id)
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

            const id = req.params.id;
            const { title, description, isComplete } = req.body;

        const taskToUpdate = await Task.findByPk(id);
            if (!taskToUpdate) {
                return res.status(404).json({ ok: false, msg: "Tarea no encontrada" });
        }
            
         if (!title || !description) {
            return res.status(400).json({ ok: false, msg: "title y description son obligatorios" });
        }

        if (typeof title !== "string" || title.trim().length === 0 || title.length > 100) {
            return res.status(400).json({ ok: false, msg: "title debe ser una cadena no vacía de máximo 100 caracteres" });
        }

        if (typeof description !== "string" || description.trim().length === 0 || description.length > 100) {
            return res.status(400).json({ ok: false, msg: "description debe ser una cadena no vacía de máximo 100 caracteres" });
        }

        if (isComplete !== undefined && typeof isComplete !== "boolean") {
            return res.status(400).json({ ok: false, msg: "isComplete debe ser un valor booleano" });
        }

        const existingTask = await Task.findOne({ where: { title } });
        if (existingTask) {
            return res.status(400).json({ ok: false, msg: "Ya existe una tarea con ese title" });
        }

        await Task.update({title, description, isComplete})
        return res.status(200).json({ ok: true, msg: "Tarea actualizada correctamente", Task });


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
