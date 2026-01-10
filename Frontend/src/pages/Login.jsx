import { useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { toastSuccess, toastError } from "../utils/toast";
import { Link } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
      toastSuccess("Login successful 🎉");
      navigate("/");
    } catch {
      toastError("Login failed, please try again.");
      setError("Invalid email or password");
    }
  };

  return (
    <form className="auth-box" onSubmit={submit}>
      <h2>Welcome Back!</h2>
      <h2>Login to Your Account</h2>

      {error && <p className="error-message">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>

      <p className="auth-switch">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
}
