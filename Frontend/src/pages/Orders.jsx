import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/orders.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("orders/")
      .then(res => setOrders(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading orders...</p>;

  if (orders.length === 0) {
    return <p>You have not placed any orders yet.</p>;
  }

  return (
    <div className="orders-page">
      <h2>Your Orders</h2>

      <div className="orders-list">
        {orders.map(order => (
          <div className="order-card" key={order.id}>
            <div className="order-header">
              <div>
                <strong>Order #{order.id}</strong>
                <p className="order-date">
                  {new Date(order.created_at).toLocaleString()}
                </p>
              </div>

              <span className={`status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>

            <div className="order-items">
              {order.items.map((item, index) => (
                <div className="order-item" key={index}>
                  <span>{item.product_name}</span>
                  <span>x{item.quantity}</span>
                  <span>₹{item.price}</span>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <strong>Total: ₹{order.total_price}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
