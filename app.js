import 'dotenv/config';
import express from "express";
import { starBD } from "./src/config/database.js";
import { taskRoutes } from "./src/routes/task.routes.js";
import { userRoutes } from "./src/routes/user.routes.js";
import { socialRoutes } from './src/routes/social.routes.js';
import { db_relations } from './src/models/index.js';

const app = express();

app.use(express.json())

db_relations()

const PORT = process.env.PORT || 3000;


app.use("/api", taskRoutes)
app.use("/api",userRoutes)
app.use("/api", socialRoutes)


app.listen(PORT, async () => {
    await starBD();
    console.log(`server prendido en el puerto ${PORT}`);
})
