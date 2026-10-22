
import { useState } from "react";
import "./App.css";

const API_URL = "http://127.0.0.1:8000";

function Login({ onLogin, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          Array.isArray(data.detail)
            ? data.detail.map((item) => item.msg).join(", ")
            : data.detail || "Login failed"
        );
      }

      if (!data.access_token) {
        throw new Error("No access token received.");
      }

      localStorage.setItem("access_token", data.access_token);
      onLogin(data);
    } catch (err) {
      setError(err.message || "Cannot connect to FastAPI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page login-background">
      <div className="auth-brand">
        <div className="auth-brand-icon">✦</div>
        <h2>Student Management System</h2>
        <p>Learn · Grow · Succeed</p>
      </div>

      <section className="auth-card">
        <div className="auth-icon">⌂</div>
        <h1>Welcome Back</h1>
        <p className="auth-subtitle">Login to your account</p>

        {error && <div className="alert error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="login-email">Email Address</label>
          <input
            id="login-email"
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            className="primary-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login →"}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <button type="button" onClick={onRegister}>
            Register
          </button>
        </p>
      </section>
    </div>
  );
}

export default Login;
