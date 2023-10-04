import Router from "express";
import userRouter from "@routes/userRouter";
const indexRouter = Router();

indexRouter.use("/user", userRouter);

export default indexRouter;
