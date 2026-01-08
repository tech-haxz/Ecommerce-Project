import { useState } from "react";
import api from "../api/axios";
import "../styles/auth.css";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    phone: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("users/register/", form);
      alert("Registration successful. Please login.");
      window.location.href = "/login";
    } catch (err) {
      setError("Registration failed. Check details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-box" onSubmit={submit}>
      <h2>Create Account</h2>

      {error && <p className="error-text">{error}</p>}

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />

      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
        required
      />

      <input
        name="phone"
        placeholder="Phone (optional)"
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />

      <button disabled={loading}>
        {loading ? "Creating..." : "Register"}
      </button>

      <p className="auth-switch">
        Already have an account? <a href="/login">Login</a>
      </p>
    </form>
  );
}
