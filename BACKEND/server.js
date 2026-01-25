//this is the server app
import express from "express"
import chalk from "chalk"
import dotenv from "dotenv"
import connect_db from "./config/connect_db.js"
dotenv.config();
import setupMiddleWare from "./startup/setupMiddleware.js";
import setupRoutes from "./startup/setupRoutes.js";

const app = express();

const port = process.env.PORT;
const mongo_uri = process.env.MONGO_URI;

connect_db(mongo_uri);
setupMiddleWare(app)
setupRoutes(app);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "this is the home page"
    })
})
app.listen(port, () => {
    console.log(chalk.green("server is connected ✅") + chalk.yellow(port));
})