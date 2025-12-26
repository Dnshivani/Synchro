//this is the server app
import express from "express"
import chalk from "chalk"
import dotenv from "dotenv"
import cors from "cors"
dotenv.config();
import connect_db from "./config/connect_db.js";
const app = express();
const port = process.env.PORT;
const mongo_uri = process.env.MONGO_URI;
connect_db(mongo_uri);
app.use(cors());

app.listen(port, () => {
    console.log(chalk.green("server is connected ✅") + chalk.yellow(port));
})