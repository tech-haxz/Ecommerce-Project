import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("products/")
      .then(res => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  const addToCart = async (productId) => {
    try {
      await api.post("cart/add/", {
        product_id: productId,
        quantity: 1
      });
      alert("Added to cart");
    } catch {
      alert("Unable to add product");
    }
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="products-page">
      <h2>Products</h2>

      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <div className="product-card" key={product.id}>
              <img
                src={product.image || "/placeholder.png"}
                alt={product.name}
              />

              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">₹{product.price}</p>

                <button onClick={() => addToCart(product.id)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
