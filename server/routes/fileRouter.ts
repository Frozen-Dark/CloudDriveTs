import Router from "express";
import fileController from "@controllers/fileController";
import fileUpload from "express-fileupload";
import folderController from "@controllers/folderController";
const router = Router();

router.post("/createDir", folderController.create);

router.post("/uploadFile", fileUpload({}), fileController.upload);
router.post("/deleteFile", fileController.delete);
router.put("/renameFile", fileController.rename);
router.put("/moveFile", fileController.move);

router.post("/getFilesByParentId", fileController.getFilesByParentId);

router.post("link/getFilesByLink", () => {});

export default router;
