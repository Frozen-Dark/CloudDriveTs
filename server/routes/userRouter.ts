import Router from "express";
import userController from "@controllers/userController";
import minoMiddleware from "@middlewares/minoMiddleware";
const router = Router();

router.post("/registration", minoMiddleware, userController.registration);
router.post("/login", userController.login);

router.get("/refresh", userController.refresh);
router.get("/authorization", userController.authorization);

export default router;
