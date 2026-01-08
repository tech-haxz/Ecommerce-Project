import { useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import "../styles/auth.css";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await login(email, password);
    window.location.href = "/";
  };

  return (
    <form className="auth-box" onSubmit={submit}>
        <h2>Welcome Back!</h2>
        <h2>Login to Your Account</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Login</button>

      <p className="auth-switch">
        Don't have an account? <a href="/register">Register</a>
      </p>
    </form>
  );
}
