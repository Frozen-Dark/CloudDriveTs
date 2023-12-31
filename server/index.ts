import "dotenv/config"; // require("dotenv").config();
import express from "express";
import sequelize from "./db";
import cookieParser from "cookie-parser";
import indexRouter from "./routes/index";
import useragent from "express-useragent";
import userAgentMiddleware from "@middlewares/userAgentMiddleware";
import corsOptions from "@middlewares/corsOptions";
import minoMiddleware from "@middlewares/minoMiddleware";
import errorMiddleware from "@middlewares/errorHandlingMiddleware";

const PORT = process.env.PORT || 6000;
const app = express();

app.use(corsOptions);
app.use(useragent.express());
app.use(userAgentMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use(minoMiddleware);

app.use("/api", indexRouter);
app.use(errorMiddleware);

const start = async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync();
		app.listen(PORT, () => console.log(`Сервер запущен на порте: ${PORT}`));
	} catch (e) {
		console.log(e);
	}
};

start();
