import Router from "express"
import userController from "../controllers/userController";
// @ts-ignore
const router = new Router();

router.post("/registration", userController.registration)

export default router
