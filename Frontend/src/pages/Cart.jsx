import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/cart.css";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const fetchCart = () => {
    api
      .get("cart/")
      .then((res) => setCart(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (itemId, quantity) => {
    if (quantity < 1) return;

    await api.post("cart/update/", {
      item_id: itemId,
      quantity,
    });

    fetchCart();
  };

  const removeItem = async (itemId) => {
    await api.post("cart/remove/", { item_id: itemId });
    fetchCart();
  };

  if (loading) return <p>Loading cart...</p>;

  if (!cart || cart.items.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  const checkout = async () => {
    if (processing) return;
    setProcessing(true);

    try {
      // 1️⃣ Create Order
      const orderRes = await api.post("orders/create/");
      const orderId = orderRes.data.order_id;

      // 2️⃣ Init Payment
      const paymentRes = await api.post("payments/init/", {
        order_id: orderId,
      });

      const options = {
        key: paymentRes.data.razorpay_key,
        amount: paymentRes.data.amount,
        currency: "INR",
        name: "E-Commerce App",
        description: "Order Payment",
        order_id: paymentRes.data.razorpay_order_id,

        handler: async function (response) {
          // 3️⃣ Verify Payment
          await api.post("payments/verify/", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          alert("Payment successful!");
          window.location.href = "/orders";
        },

        theme: {
          color: "#000000",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      alert("Payment failed. Try again.");
    } finally {
    setProcessing(false);
  }
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      <div className="cart-list">
        {cart.items.map((item) => (
          <div className="cart-item" key={item.id}>
            <div className="cart-info">
              <h4>{item.product_name}</h4>
              <p>₹{item.price}</p>
            </div>

            <div className="cart-actions">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>

            <div className="cart-remove">
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total: ₹{cart.total_price}</h3>
        <button className="checkout-btn" onClick={checkout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
