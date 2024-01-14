import Router from "express";
import folderController from "@controllers/folderController";
const router = Router();

router.post("/create", folderController.create);
router.post("/delete", folderController.delete);
router.put("/rename", folderController.rename);
router.put("/move", folderController.move);

export default router;
