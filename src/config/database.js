import { Sequelize } from "sequelize";

export const sequelize = new Sequelize (
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT

    }

)


export const starBD = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({force: true})
        console.log("!!La conecion con la BD fue un exito!!");

    } catch(error) {
        console.error("!X! Error al conectar con la BD !X!");
    }
}