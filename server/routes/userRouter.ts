import Router from "express";
import userController from "@controllers/userController";
import authMiddleware from "@middlewares/authMiddleware";
const router = Router();

router.post("/registration", userController.registration);
router.post("/login", () => {});
router.get("/authorization", authMiddleware, () => {});

export default router;
