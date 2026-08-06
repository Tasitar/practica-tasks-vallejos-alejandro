import { Sequelize } from "sequelize";

export const sequelize = new Sequelize ('tasks_users_db', 'root', '',{
    host: 'localhost',
    dialect:'mysql'
})


export const starBD = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({force: false})
        console.log("!!La conecion con la BD fue un exito!!");

    } catch(error) {
        console.error("!X! Error al conectar con la BD !X!");
    }
}