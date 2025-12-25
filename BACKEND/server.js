//this is the server app
import express from "express"
import chalk from "chalk"
import dotenv from "dotenv"
import cors from "cors"
dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(cors());

app.listen(port, () => {
    console.log(chalk.green("server is connected ✅") + chalk.yellow(port));
})