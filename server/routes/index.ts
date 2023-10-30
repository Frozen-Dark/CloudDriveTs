import Router from "express";
import userRouter from "@routes/userRouter";
import fileRouter from "@routes/fileRouter";
import minoMiddleware from "@middlewares/minoMiddleware";
import authMiddleware from "@middlewares/authMiddleware";
const indexRouter = Router();

indexRouter.use("/file", authMiddleware, minoMiddleware);

indexRouter.use("/user", userRouter);
indexRouter.use("/file", fileRouter);

export default indexRouter;
