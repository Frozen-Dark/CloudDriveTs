import Router from "express";
import userRouter from "@routes/userRouter";
import fileRouter from "@routes/fileRouter";
import minoMiddleware from "@middlewares/minoMiddleware";
import authMiddleware from "@middlewares/authMiddleware";
import folderRouter from "@routes/folderRouter";
const indexRouter = Router();

indexRouter.use("/file", authMiddleware, minoMiddleware);
indexRouter.use("/folder", authMiddleware);

indexRouter.use("/user", userRouter);
indexRouter.use("/file", fileRouter);
indexRouter.use("/folder", folderRouter);

export default indexRouter;
