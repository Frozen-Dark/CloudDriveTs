import {Sequelize} from "sequelize";

const sequelize = new Sequelize(
    process.env.DB_NAME || "disk",
    process.env.DB_USER || "root",
    process.env.DB_PASSWORD || "1234",
    {
        dialect: "postgres",
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT) || 5432
    }
)
export default sequelize;
