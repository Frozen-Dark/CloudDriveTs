import Router from "express";
import fileController from "@controllers/fileController";
import fileUpload from "express-fileupload";
const router = Router();

router.post("/upload", fileUpload({}), fileController.upload);
router.post("/download", fileController.download);
router.post("/delete", fileController.delete);
router.put("/rename", fileController.rename);
router.put("/move", fileController.move);

router.post("/getFilesByFolderId", fileController.getFilesByParentId);

router.post("link/getFilesByLink", () => {});

export default router;
