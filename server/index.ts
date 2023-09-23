import express from "express"
import dotenv from "dotenv"
dotenv.config()
import * as process from "process";
import sequelize from "./db";
import router from "./routes/userRouter"

const PORT = process.env.PORT || 6000
const app = express()
app.use(express.json())

app.use("/api/user", router)


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Сервер запущен на порте: ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
