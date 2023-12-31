import Router from "express";
import userController from "@controllers/userController";
import minoMiddleware from "@middlewares/minoMiddleware";
const router = Router();

router.post("/registration", minoMiddleware, userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

router.get("/refresh", userController.refresh);

export default router;
