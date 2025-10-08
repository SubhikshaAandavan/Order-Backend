// import pkg from 'pg';
// const { Pool } = pkg;

// export const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "Order-Management",
//   password: "Subhiksha123*",
//   port: 5432,
// });
// pool.connect()
//   .then(() => console.log("✅ Connected to PostgreSQL Database"))
//   .catch((err) => console.error("❌ DB Connection Error:", err.message));

import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Neon requires SSL
  },
});

export default pool;
