import express from "express";
import multer from "multer";
import { uploadFile, getFiles, downloadFile } from "../controllers/uploadController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), uploadFile);
router.get("/", getFiles);
router.get("/download/:id", downloadFile);

export default router;
