import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/cart.css";
import { toastSuccess, toastError } from "../utils/toast";


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

  try {
    await api.post("cart/update/", {
      item_id: itemId,
      quantity,
    });

    toastSuccess("Cart updated");
    fetchCart();
  } catch {
    toastError("Failed to update cart");
  }
};


  const removeItem = async (itemId) => {
  try {
    await api.post("cart/remove/", { item_id: itemId });
    toastSuccess("Item removed from cart");
    fetchCart();
  } catch {
    toastError("Failed to remove item");
  }
};


  if (loading) return <p>Loading cart...</p>;

  if (!cart || cart.items.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  const checkout = async () => {
  if (processing) return;
  setProcessing(true);

  try {
    const orderRes = await api.post("orders/create/");
    const orderId = orderRes.data.order_id;

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
        await api.post("payments/verify/", {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });

        toastSuccess("Payment successful 🎉");
        window.location.href = "/orders";
      },
    };

    new window.Razorpay(options).open();
  } catch {
    toastError("Payment failed: Server Down!");
  } finally {
    setProcessing(false);
  }
};


  // console.log(cart.items[0].image);

  return (
  <div className="cart-page">
    <h2>Your Cart</h2>

    <div className="cart-container">
      <div className="cart-list">
        {cart.items.map((item) => (
          <div className="cart-item" key={item.id}>
            <div className="cart-info">
              <img
                src={`http://127.0.0.1:8000${item.image}`}
                alt={item.product_name}
              />
              <div className="cart-details">
                <h4>{item.product_name}</h4>
                <p className="price">₹{item.price}</p>
              </div>
            </div>

            <div className="cart-actions">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>

            <div className="cart-remove">
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Order Summary</h3>
        <p className="total">Total: ₹{cart.total_price}</p>
        <button
          className="checkout-btn"
          onClick={checkout}
          disabled={processing}
        >
          {processing ? "Processing..." : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  </div>
)};
