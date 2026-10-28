import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "./services/api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const body = new URLSearchParams();
      body.append("username", email.trim());
      body.append("password", password);
      body.append("role", "admin"); // admin role
      const data = await apiRequest("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!data.access_token) throw new Error("No token");
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user || { email: email.trim(), role:"admin" }));
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Admin login failed");
    } finally { setLoading(false); }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link to="/" className="auth-logo"><img src="/logo.svg" alt="CampusCore" /></Link>
        <div className="auth-brand-icon">🛡️</div>
        <p className="eyebrow">ADMINISTRATION</p>
        <h1>Administrator Login</h1>
        <p className="muted">Sign in with your admin account. Must be verified by backend.</p>
        {error && <div className="error-message">{error}</div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>Email address<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@example.com" required /></label>
          <label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter password" required /></label>
          <button className="primary-button full-width" type="submit" disabled={loading}>{loading?"Signing in...":"Sign In as Admin"}</button>
        </form>
        <p className="auth-footer">Student? <Link to="/login">Student Login</Link></p>
        <Link to="/" className="back-home">← Back to Home</Link>
      </section>
    </main>
  );
}