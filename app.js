import express from "express";
import { starBD } from "./src/config/database.js";

const app = express();

app.use(express.json())



const PORT = 3000;



app.listen(PORT, async () => {
    await starBD();
    console.log(`server prendido en el puerto ${PORT}`);
})
