import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCloseLargeLine } from "react-icons/ri";
import "../styles/navbar.css";

export default function Navbar() {
  const { logout, accessToken } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const LoginPage = () => {
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">Storify</div>

      {/* Desktop Links */}
      <div className="nav-links desktop-only">
        <NavLink to="/" end>
          Products
        </NavLink>
        <NavLink to="/cart">Cart</NavLink>
        <NavLink to="/orders">Orders</NavLink>

        <button
          className="logout-btn"
          onClick={accessToken ? logout : LoginPage}
        >
          {accessToken ? "Logout" : "Login / Register"}
        </button>
      </div>

      {/* Mobile Hamburger */}
      <div
        className="hamburger mobile-only"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <GiHamburgerMenu size={26} />
      </div>

      {/* Mobile Menu – Full Screen */}
      {menuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-full">
            <NavLink to="/" end onClick={() => setMenuOpen(false)}>
              Products
            </NavLink>
            <NavLink to="/cart" onClick={() => setMenuOpen(false)}>
              Cart
            </NavLink>
            <NavLink to="/orders" onClick={() => setMenuOpen(false)}>
              Orders
            </NavLink>

            <button
              onClick={() => {
                setMenuOpen(false);
                accessToken ? logout() : LoginPage();
              }}
            >
              {accessToken ? "Logout" : "Login / Register"}
            </button>
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="mobile-menu-overlay">
          {/* Close Icon */}
          <div className="mobile-menu-close" onClick={() => setMenuOpen(false)}>
            <RiCloseLargeLine size={32} />
          </div>

          <div className="mobile-menu-full">
            <NavLink to="/" end onClick={() => setMenuOpen(false)}>
              Products
            </NavLink>
            <NavLink to="/cart" onClick={() => setMenuOpen(false)}>
              Cart
            </NavLink>
            <NavLink to="/orders" onClick={() => setMenuOpen(false)}>
              Orders
            </NavLink>

            <button
              onClick={() => {
                setMenuOpen(false);
                accessToken ? logout() : LoginPage();
              }}
            >
              {accessToken ? "Logout" : "Login / Register"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
