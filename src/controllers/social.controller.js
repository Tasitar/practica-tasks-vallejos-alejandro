import { matchedData } from "express-validator";
import { Social } from "../models/social.model.js";

export const createSocials = async (req,res) =>{
    const validatedData = matchedData(req)
    try {

        await Social.create(validatedData)

        return res.status(201).json({message:"Los datos de las redes del usuario se cargaron correctamente"})
        
    } catch (error) {
        return res.status(500).json({message:"ocurrio un error al crear los datos de las redes del usuario",error: error})
    }
}

export const getAllSocials = async (req,res) =>{
    const validatedData = matchedData(req)
    try {
        const redes = await Social.findAll()
        return res.status(200).json({message:'Los datos se rescataron exitosamente',redes})
    } catch (error) {
        return res.status(500).json({message:"ocurrio un error al obtener las redes del usuario",error: error})
    }
}


export const getOneSocial = async (req,res) =>{
    try {
        const {id} = req.body

        const socialExist = await Social.findByPk(id)

        if (!socialExist) {
            return res.status(404).json({message:"no se encontro la red social"})
        }

        return res.status(200).json(socialExist)

    } catch (error) {
        return res.status(500).json({message:"ocurrio un error al obtener los datos de las redes del usuario",error: error})
    }
}

export const updateSocial = async (req,res) =>{
    try {
        const validatedDataBody = matchedData(req,{locations:['body']})
        const {id} = matchedData(req,{locations:['params']})

        const socialExist = await Social.findByPk(id)

        if (!socialExist) {
            return res.status(404).json({message:"no se encontro la red social"})
        }

        await socialExist.update(validatedDataBody)

        return res.status(200).json({message:"se actualizaron correctamente los datos",social:socialExist})

    } catch (error) {
        return res.status(500).json({message:"ocurrio un error al actualizar los datos de las redes del usuario",error: error})
    }
}

export const deleteSocial = async (req,res) =>{
    try {
        const {id} = req.body

        const socialExist = await Social.findByPk(id)

        if (!socialExist) {
            return res.status(404).json({message:"no se encontro la red social"})
        }

        await socialExist.destroy()

        return res.status(200).json({message:"se elimino correctamente los datos",social:socialExist})


    } catch (error) {
        return res.status(500).json({message:"ocurrio un error al eliminar los datos de las redes del usuario",error: error})
        
    }
}