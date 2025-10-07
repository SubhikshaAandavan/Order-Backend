import { pool } from "../db/db.js";
import fs from "fs";
import path from "path";

// Upload a file
export const uploadFile = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  try {
    const { originalname, filename } = req.file;

    await pool.query(
      "INSERT INTO orders.files (original_name, stored_name) VALUES ($1, $2)",
      [originalname, filename]
    );

    res.json({ message: "File uploaded successfully", originalName: originalname });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
};

// Get all files
export const getFiles = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, original_name, uploaded_at FROM orders.files ORDER BY uploaded_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching files" });
  }
};

// Download file
export const downloadFile = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM orders.files WHERE id = $1", [id]);

    if (result.rows.length === 0)
      return res.status(404).json({ message: "File not found" });

    const fileData = result.rows[0];
    const filePath = path.join(process.cwd(), "uploads", fileData.stored_name);

    if (!fs.existsSync(filePath))
      return res.status(404).json({ message: "File missing on server" });

    res.download(filePath, fileData.original_name);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Download failed" });
  }
};
