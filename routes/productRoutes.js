import express from "express";
import multer from "multer";
import { uploadProduct, getProducts } from "../controllers/productController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Upload new product
router.post("/", upload.single("image"), uploadProduct);

// Get all products
router.get("/", getProducts);

export default router;
