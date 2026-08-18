import { personalModel } from "../models/person.model.js";
import { user } from "../models/user.model.js";

//Debe ser una cadena no vacía y de un máximo de 100 caracteres.
export const newUser = async (req, res) => {
    try {

        const {name, email, password,person, social } = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({ ok: false, msg: "name, email, password son obligatorios" });
        } 
             
              if (typeof name !== "string" || name.trim().length === 0 || name.length > 100) {
                  return res.status(400).json({ ok: false, msg: "name debe ser una cadena no vacía de máximo 100 caracteres" });
              }
      
              if (typeof email !== "string" || email.trim().length === 0 || email.length > 100) {
                  return res.status(400).json({ ok: false, msg: "email debe ser una cadena no vacía de máximo 100 caracteres" });
              }
      
                if (typeof password !== "string" || password.trim().length === 0 || password.length > 100) {
                  return res.status(400).json({ ok: false, msg: "password debe ser una cadena no vacía de máximo 100 caracteres" });
              }        
      
              const existingUser = await user.findOne({ where: { email } });
              if (existingUser) {
                  return res.status(400).json({ ok: false, msg: "El correo ya esta registrado" });
              }


              const {namePerson, lastname} = person
            
              if (!lastname || name.length > 100) {
                 return res.status(400).json({ message: "el apellido no culpe con el formato adecuado , asegurese de que no esta vacio o tenga mas de 100 caracteres" })
              }


              const newPerson = await personalModel.create({
                namePerson,
                lastname,
              })
              
              const person_id = newPerson.id

              const newUser = await user.create({
                  name,
                  email,
                  password,
                  person_id
              });


              if(social){
                for(let red_s of social) {
                    const {red_social, user_name} = red_s

                    if (!red_social || red_social.length > 30){
                         return res.status(400).json({ message: "el nombre de la red social no culpe con el formato adecuado , asegurese de que no esta vacio o tenga mas de 30 caracteres" })
                    }
                    if (!user_name || user_name.length > 20) {
                    return res.status(400).json({ message: "el nombre de usuario no culpe con el formato adecuado , asegurese de que no esta vacio o tenga mas de 20 caracteres" })
                }

                const redSocial = await Socials.create({red_social,user_name})
                const social_id = redSocial.dataValues.id

                await Socials_Users.create({user_id,social_id})
                }
              }
      
              return res.status(201).json({ ok: true, msg: "Usuario creado correctamente", newUser,person  });
      
          } catch (error) {
              console.error(error);
              return res.status(500).json({ ok: false, msg: "Error interno del servidor" });
          }
      };
      




       export const getUsers = async (req, res) => {
              try {
      
                  const users = await user.findAll({
                     attributes: { exclude:['password']},
                     include:[{model:Tasks,as:'tasks'},{model:Socials,as:'red_social'}]
                  });
                  if (Task.length === 0) {
                      return res.status(200).json({ok: false, msg: "No hay tareas Usuarios registrados"})
                      return res.status(200).json({ok: true, msg:"Usuarios encontrados", users})
                  }
                      
      
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

        const {name, email, password} = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({ ok: false, msg: "name, email, password son obligatorios" });
        } 
             
              if (typeof name !== "string" || name.trim().length === 0 || name.length > 100) {
                  return res.status(400).json({ ok: false, msg: "name debe ser una cadena no vacía de máximo 100 caracteres" });
              }
      
              if (typeof email !== "string" || email.trim().length === 0 || email.length > 100) {
                  return res.status(400).json({ ok: false, msg: "email debe ser una cadena no vacía de máximo 100 caracteres" });
              }
      
                if (typeof password !== "string" || password.trim().length === 0 || password.length > 100) {
                  return res.status(400).json({ ok: false, msg: "password debe ser una cadena no vacía de máximo 100 caracteres" });
              }        
      
              const existingUser = await user.findOne({ where: { email } });
              if (existingUser) {
                  return res.status(400).json({ ok: false, msg: "El correo ya esta registrado" });
              }
      
              const user = await user.update({
                  name,
                  email,
                  password
              });
      
              return res.status(201).json({ ok: true, msg: "Usuario creado correctamente", user });
      
          } catch (error) {
              console.error(error);
              return res.status(500).json({ ok: false, msg: "Error interno del servidor" });
          }
      };