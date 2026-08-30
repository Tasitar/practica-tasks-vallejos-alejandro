import { matchedData, validationResult } from "express-validator";
import { user } from "../models/user.model.js";
import { personalModel } from "../models/person.model.js";




export const newUser = async (req, res) => {
    try {
        const validateData = matchedData(req);

        const {namePerson, lastname, ...userData } = validateData

        const newPerson = await personalModel.create({namePerson, lastname});

        const nUser = await user.create({...userData,person_id:newPerson.id});
        return res.status(201).json(nUser);
            
          } catch (error) {
              console.error(error);
              return res.status(500).json({ ok: false, msg: "Error interno del servidor" });
          }
      };



       export const getUsers = async (req, res) => {
              try {
      
                  const users = await user.findAll({
                     attributes: { exclude:['password']},
                     include:[{model:personalModel,as:'person'}]
                  });
                  if (user.length === 0) {
                      return res.status(200).json({ok: false, msg: "No hay tareas Usuarios registrados"})
                  }
                    
                      return res.status(200).json({ok:true, users})
      
              }catch (error) {  
      
                      console.error(error);
                      return res.status(500).json({ok: false, msg: "Error interno del sistema"})
                }
          };

              export const getOneUser = async (req, res) => {
                  try{
                      const { id } = req.params;
                      const foundUser = await user.findByPk(id, {
                          attributes: { exclude:['password']},
                          include:[{model:Tasks,as:'tasks'},{model:Socials,as:'red_social'}]
                      })
                      if (!foundUser) {
                          return res.status(404).json({ ok: false, msg: "Usuarios no encontrada" });
                      }
                          return res.status(200).json({ ok: true, foundUser }) 

          
                  } catch(error) {
                      console.error(error);
                      return res.status(500).json({ ok: false, msg: "Error interno del sistema" });
          
                  }
              }


              export const deleteUsers = async (req, res) => {
                      try {
                          const { id } = req.params;
                          const user = await user.findByPk(id);
                          if (!user) {
                            return res.status(404).json({ ok: false, msg: "Uasuario no encontrado" });
                          }
              
                          await user.destroy();
                          return res.status(200).json({ ok: true, msg: "Usuario eliminada correctamente" });
              
              
              
                      } catch (error) {
                         console.error(error);
                         return res.status(500).json({ ok: false, msg: "Error interno del servidor" });
                      }
                  }



export const updateUsers = async (req, res) => {
    try {
        
        const validateData = matchedData(req,{locations:["body"]});
        const { id } = matchedData(req,{locations:["params"]});


        const userToUpdate = await user.findByPk(id)
        if (!userToUpdate) {
          return res.status(404).json({ok: false, msg:"Usuario no encontrado"})
        }

        await userToUpdate.update(validateData)

            return res.status(200).json({
                ok: true,
                msg: "Tarea actualizada correctamente",
                user: userToUpdate
            })

          } catch (error) {
              console.error(error);
              return res.status(500).json({ ok: false, msg: "Error al intentar actualizar el usuario" });
          }
      };