import express from "express";
import {
  getOrderStatus,
  getOrdersByDate,
  getRevenueTrend,
  getTopProducts,
  getTopCustomers,
} from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/order-status", getOrderStatus);
router.get("/orders-by-date", getOrdersByDate);
router.get("/revenue-trend", getRevenueTrend);
router.get("/top-products", getTopProducts);
router.get("/top-customers", getTopCustomers);

export default router;
