import { Social } from "./social.model.js";
import { Social_Users } from "./socials_users.models.js";
import { personalModel } from "./person.model.js";
import { Task } from "./task.model.js";
import { user } from "./user.model.js";




export const db_relations = () => {
    //relacion 1 a muchos
    Task.belongsTo(user, {foreignKey:'user_id', as:'user'});
    user.hasMany(Task, {foreignKey: 'user_id', as: 'tasks'});
    //relacion 1 a 1
    user.belongsTo(personalModel,{foreignKey:"person_id", as:"person"})
    personalModel.hasOne(user,{foreignKey:"person_id", as:"person"})

    //relacion muchos a muchos
    user.belongsToMany(Social,{through:Social_Users,foreignKey:"user_id", as:"red_social"})
    Social.belongsToMany(user,{through:Social_Users,foreignKey:"user_id", as:"user"})
}