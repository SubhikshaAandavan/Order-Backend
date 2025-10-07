import express from "express";
import cors from "cors";

import orderRoutes from "./routes/orders.js";

import analyticsRoutes from "./routes/analytics.js";

import uploadRoutes from "./routes/uploadRoutes.js";
import productRoutes from "./routes/productRoutes.js";




const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/orders", orderRoutes);

app.use("/api/analytics", analyticsRoutes);

app.use("/uploads", express.static("uploads")); // serve static files
app.use("/api/upload", uploadRoutes);
app.use("/api/products", productRoutes);
app.listen(5000, () => console.log("✅ Server running on port 5000"));




const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
