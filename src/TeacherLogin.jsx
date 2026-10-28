import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "./services/api";

export default function TeacherLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(""); setLoading(true);
    try {
      const body = new URLSearchParams();
      body.append("username", email.trim());
      body.append("password", password);
      const data = await apiRequest("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!data.access_token) throw new Error("No token");
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user || { email: email.trim(), role: "teacher" }));
      navigate("/dashboard");
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link to="/" className="auth-logo"><img src="/logo.svg" alt="Logo" /></Link>
        <div className="auth-brand-icon">👨‍🏫</div>
        <p className="eyebrow">TEACHER PORTAL</p>
        <h1>Teacher Login</h1>
        <p className="muted">Access your teacher dashboard.</p>
        {error && <div className="error-message">{error}</div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="teacher@example.com" required /></label>
          <label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter password" required /></label>
          <button className="primary-button full-width" type="submit" disabled={loading}>{loading ? "Signing in..." : "Sign In as Teacher"}</button>
        </form>
        <p className="auth-footer">Don't have account? <Link to="/teacher-register">Create teacher account</Link></p>
        <Link to="/" className="back-home">← Back to Home</Link>
      </section>
    </main>
  );
}