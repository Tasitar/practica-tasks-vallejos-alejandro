import express from "express";
import { starBD } from "./src/config/database.js";
import { taskRoutes } from "./src/routes/task.routes.js";


const app = express();

app.use(express.json())

const PORT = 3000;


app.use("/api", taskRoutes )


app.listen(PORT, async () => {
    await starBD();
    console.log(`server prendido en el puerto ${PORT}`);
})
