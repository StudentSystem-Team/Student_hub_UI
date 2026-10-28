import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "./services/api";

export default function TeacherRegister() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    if (password.length < 8) { setError("Password must contain at least 8 characters."); return; }
    setLoading(true);
    try {
      await apiRequest("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), password, role: "teacher" }),
      });
      navigate("/teacher-login", { state: { message: "Teacher account created. Please sign in." } });
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-brand-icon">👨‍🏫</div>
        <p className="eyebrow">TEACHER PORTAL</p>
        <h1>Create Teacher account</h1>
        <p className="muted">Register to access teacher system.</p>
        {error && <p className="error-message">{error}</p>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>Full name<input value={name} onChange={e=>setName(e.target.value)} placeholder="Teacher full name" required /></label>
          <label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="teacher@example.com" required /></label>
          <label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 8 characters" required /></label>
          <button className="primary-button full-width" type="submit" disabled={loading}>{loading ? "Creating..." : "Create Teacher Account"}</button>
        </form>
        <p className="auth-footer">Already registered? <Link to="/teacher-login">Teacher Sign in</Link></p>
        <Link to="/" className="back-home">← Back to Home</Link>
      </section>
    </main>
  );
}