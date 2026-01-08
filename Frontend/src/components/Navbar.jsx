import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import "../styles/navbar.css";

export default function Navbar() {
  const { logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="nav-logo">E-Commerce</div>

      <div className="nav-links">
        <NavLink to="/" end>Products</NavLink>
        <NavLink to="/cart">Cart</NavLink>
        <NavLink to="/orders">Orders</NavLink>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
