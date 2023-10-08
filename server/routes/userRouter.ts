import Router from "express";
import userController from "@controllers/userController";
import authMiddleware from "@middlewares/authMiddleware";
const router = Router();

router.post("/registration", userController.registration);
router.post("/login", userController.login);

router.get("/refresh", userController.refresh);
router.get("/authorization", authMiddleware, userController.authorization);

export default router;
