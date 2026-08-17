import { personalModel } from "./person.model.js";
import { Task } from "./task.model.js";
import { user } from "./user.model.js";




export const db_relations = () => {

    Task.belongsTo(user, {foreignKey:'user_id', as:'user'});
    user.hasMany(Task, {foreignKey: 'user_id', as: 'tasks'});

    user.belongsTo(personalModel,{foreignKey:"person_id", as:"person"})
    personalModel.hasOne(user,{foreignKey:"person_id", as:"person"})

}
