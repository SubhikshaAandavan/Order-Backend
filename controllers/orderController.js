import  pool  from "../db/db.js";

export const getOrders = async (req, res) => {
  try {
    const { status, search } = req.query;
    let query = "SELECT * FROM orders.orders WHERE 1=1";
    const params = [];

    if (status) {
      params.push(status);
      query += ` AND status = $${params.length}`;
    }

    if (search) {
      params.push(`%${search}%`);
      query += ` AND (CAST(order_id AS TEXT) ILIKE $${params.length} OR CAST(user_id AS TEXT) ILIKE $${params.length})`;
    }

    query += " ORDER BY created_at DESC";
    const { rows } = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    // 1️⃣ Fetch order info
    const orderQuery = `
      SELECT o.*, p.payment_method, p.payment_status, p.transaction_id,
             s.courier_name, s.tracking_number, s.shipped_at, s.delivered_at
      FROM orders.orders o
      LEFT JOIN orders.payments p ON o.order_id = p.order_id
      LEFT JOIN orders.shipments s ON o.order_id = s.order_id
      WHERE o.order_id = $1
    `;
    const orderResult = await pool.query(orderQuery, [id]);

    if (orderResult.rows.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 2️⃣ Fetch items for that order
    const itemsQuery = `
      SELECT oi.*, oi.quantity * oi.price AS total_price
      FROM orders.order_items oi
      WHERE oi.order_id = $1
    `;
    const itemsResult = await pool.query(itemsQuery, [id]);

    // 3️⃣ Combine both
    const orderDetails = {
      ...orderResult.rows[0],
      items: itemsResult.rows,
    };

    res.json(orderDetails);
  } catch (err) {
    console.error("Error fetching order details:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const query = "UPDATE orders.orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE order_id = $2 RETURNING *";
    const { rows } = await pool.query(query, [status, id]);

    if (rows.length === 0) return res.status(404).json({ message: "Order not found" });

    res.json(rows[0]); // Return updated order
  } catch (err) {
    console.error("Error updating status:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

