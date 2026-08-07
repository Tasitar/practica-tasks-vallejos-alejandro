import { Task } from "../routes/task.model.js"


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

        const task = await Task.create({
            title,
            description,
            isComplete: isComplete ?? false,
        });

        return res.status(201).json({ ok: true, msg: "Tarea creada correctamente", task });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, msg: "Error interno del servidor" });
    }
};