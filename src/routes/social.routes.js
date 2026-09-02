import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { createSocials, getAllSocials, getOneSocial, updateSocial } from "../controllers/social.controller.js";
import { createSocialValidation, updateSocialValidation } from "../middlewares/validations/social.model.js";

export const socialRoutes = Router()

socialRoutes.get("/social",getAllSocials)
socialRoutes.get("/social/:id", getOneSocial)
socialRoutes.post("/social",createSocialValidation,validate,createSocials)
socialRoutes.put("/social/:id",updateSocialValidation,validate,updateSocial)
// socialRoutes.delete("/social/:id")