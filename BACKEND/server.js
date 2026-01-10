//this is the server app
import express from "express"
import chalk from "chalk"
import dotenv from "dotenv"
import cors from "cors"
dotenv.config();
import connect_db from "./config/connect_db.js";
import userRoute from "./routes/userRoutes.js";
// import workSpaceRoute from "./routes/workSpaceRoutes.js";

const app = express();
const port = process.env.PORT;
const mongo_uri = process.env.MONGO_URI;
connect_db(mongo_uri);
app.use(cors());
app.use(express.json());
app.use("/user", userRoute);
// app.use("/workspace", workSpaceRoute);
app.get("/", (req, res) => {
    res.status(200).json({
        message: "this is the home page"
    })
})
app.listen(port, () => {
    console.log(chalk.green("server is connected ✅") + chalk.yellow(port));
})