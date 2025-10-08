import  pool  from "../db/db.js";
import path from "path";
import fs from "fs";

// Upload new product with image
export const uploadProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    if (!req.file)
      return res.status(400).json({ message: "Image file required" });

    const { originalname, filename } = req.file;

    await pool.query(
      `INSERT INTO orders.products (name, description, price, image_name, image_path)
       VALUES ($1, $2, $3, $4, $5)`,
      [name, description, price, originalname, filename]
    );

    res.json({ message: "Product uploaded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Product upload failed" });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT product_id, name, description, price, image_name, image_path, created_at
       FROM orders.products ORDER BY created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products" });
  }
};
