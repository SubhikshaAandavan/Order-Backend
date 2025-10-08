import express from "express";
import cors from "cors";

import orderRoutes from "./routes/orders.js";

import analyticsRoutes from "./routes/analytics.js";

import uploadRoutes from "./routes/uploadRoutes.js";
import productRoutes from "./routes/productRoutes.js";




const app = express();

app.use(
  cors({
    origin: ["order-front-mny428zlv-subhiksha-as-projects.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/orders", orderRoutes);

app.use("/api/analytics", analyticsRoutes);

app.use("/uploads", express.static("uploads")); // serve static files
app.use("/api/upload", uploadRoutes);
app.use("/api/products", productRoutes);



// ✅ Optional: Add a root route for testing
app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully!");
});

// ✅ Single listen (important for Render)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));






