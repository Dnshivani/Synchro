import mongoose from "mongoose"
import chalk from "chalk"

const connect_db = async (url) => {
    try {
       const conn = await mongoose.connect(url);
       console.log(chalk.bgYellow(chalk.blue("DATABASE connected")));
    } catch (e) {
       console.error(e.message);
       process.exit(1);
    }
}
export default connect_db;