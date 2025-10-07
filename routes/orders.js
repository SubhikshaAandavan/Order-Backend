import express from "express";
import { getOrders } from "../controllers/orderController.js";
import { getOrderById } from "../controllers/orderController.js";
import { updateOrderStatus } from "../controllers/orderController.js";
const router = express.Router();

router.get("/", getOrders);  // with filtering support
router.get("/:id", getOrderById);
router.put("/:id/status", updateOrderStatus);




export default router;
