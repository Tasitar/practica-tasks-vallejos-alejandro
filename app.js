import express from "express";
import { starBD } from "./src/config/database.js";

const app = express();

const PORT = 3000;

app.use(expres.json())


app.listen(PORT, async () => {
    await starBD();
    console.log(`server prendido en el puerto ${PORT}`);
})
