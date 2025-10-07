import { pool } from "../db/db.js";

// 1️⃣ Order Status Distribution
export const getOrderStatus = async (req, res) => {
  try {
    const query = `
      SELECT status, COUNT(*) AS count
      FROM orders.orders
      GROUP BY status
      ORDER BY count DESC;
    `;
    const { rows } = await pool.query(query);
    res.json(rows.map(r => ({ status: r.status, count: Number(r.count) })));

    // res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
 };
// 2️⃣ Orders by Date with dynamic period
export const getOrdersByDate = async (req, res) => {
  const { period = "daily" } = req.query;
  let dateCol;

  switch (period) {
    case "weekly":
      dateCol = "TO_CHAR(created_at, 'IYYY-IW')";
      break;
    case "monthly":
      dateCol = "TO_CHAR(created_at, 'YYYY-MM')";
      break;
    case "yearly":
      dateCol = "TO_CHAR(created_at, 'YYYY')";
      break;
    default:
      dateCol = "TO_CHAR(created_at, 'YYYY-MM-DD')";
  }

  try {
    const query = `
      SELECT ${dateCol} AS period, COUNT(*) AS count
      FROM orders.orders
      GROUP BY period
      ORDER BY period;
    `;
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3️⃣ Revenue Trend with dynamic period
export const getRevenueTrend = async (req, res) => {
  const { period = "daily" } = req.query;
  let dateCol;

  switch (period) {
    case "weekly":
      dateCol = "TO_CHAR(created_at, 'IYYY-IW')";
      break;
    case "monthly":
      dateCol = "TO_CHAR(created_at, 'YYYY-MM')";
      break;
    case "yearly":
      dateCol = "TO_CHAR(created_at, 'YYYY')";
      break;
    default:
      dateCol = "TO_CHAR(created_at, 'YYYY-MM-DD')";
  }

  try {
    const query = `
      SELECT ${dateCol} AS period, SUM(total_amount) AS revenue
      FROM orders.orders
      WHERE status != 'Cancelled'
      GROUP BY period
      ORDER BY period;
    `;
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// // 2️⃣ Orders by Date
// export const getOrdersByDate = async (req, res) => {
//   try {
//     const query = `
//       SELECT TO_CHAR(created_at, 'YYYY-MM-DD') AS date, COUNT(*) AS count
//       FROM orders.orders
//       GROUP BY date
//       ORDER BY date;
//     `;
//     const { rows } = await pool.query(query);
//     res.json(rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // 3️⃣ Revenue Trend
// export const getRevenueTrend = async (req, res) => {
//   try {
//     const query = `
//       SELECT TO_CHAR(created_at, 'YYYY-MM-DD') AS date, SUM(total_amount) AS revenue
//       FROM orders.orders
//       WHERE status != 'Cancelled'
//       GROUP BY date
//       ORDER BY date;
//     `;
//     const { rows } = await pool.query(query);
//     res.json(rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// 4️⃣ Top Products by Sales
export const getTopProducts = async (req, res) => {
  try {
    const query = `
      SELECT product_id, SUM(quantity) AS total_sold, SUM(total_price) AS total_revenue
      FROM orders.order_items
      GROUP BY product_id
      ORDER BY total_revenue DESC
      LIMIT 5;
    `;
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 5️⃣ Top Customers by Spending
export const getTopCustomers = async (req, res) => {
  try {
    const query = `
      SELECT user_id, COUNT(*) AS total_orders, SUM(total_amount) AS total_spent
      FROM orders.orders
      GROUP BY user_id
      ORDER BY total_spent DESC
      LIMIT 5;
    `;
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
