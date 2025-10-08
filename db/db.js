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

import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_YxhQACS7D6gy@ep-quiet-boat-a1s8l838-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  ssl: {
    rejectUnauthorized: false, //
  },
});

export default pool;
