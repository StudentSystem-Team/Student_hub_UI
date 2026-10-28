import { useEffect, useState } from "react";
import api from "../services/api";

export default function TeacherProfile() {
  const [user, setUser] = useState(null);
  const [record, setRecord] = useState(null);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", subject: "" });

  useEffect(() => {
    (async () => {
      try {
        const me = await api.get("/auth/me");
        setUser(me);
        try {
          const list = await api.get("/api/teachers/");
          const mine = Array.isArray(list)
            ? list.find((t) => (t.email || "").toLowerCase() === me.username)
            : null;
          setRecord(mine || null);
        } catch {
          setRecord(null);
        }
      } catch (e) {
        setError(e.message);
      }
    })();
  }, []);

  const startEdit = () => {
    setForm({ name: record?.name || "", subject: record?.subject || "" });
    setEditing(true);
  };

  const save = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const body = { name: form.name, email: user.username, subject: form.subject };
      const saved = record
        ? await api.put(`/api/teachers/${record.id}`, body)
        : await api.post("/api/teachers/", body);
      setRecord(saved);
      setEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const rows = user
    ? [
        ["Name", record?.name || "Not added yet"],
        ["Email", user.username],
        ["Role", user.role === "admin" ? "Admin" : "Teacher"],
        ["Subject", record?.subject || "Not added yet"],
        ["Account ID", user.id ?? "-"],
      ]
    : [];

  return (
    <div style={{ padding: 24 }}>
      <h2>My Profile</h2>
      {error && <div style={errorStyle}>{error}</div>}
      {!user && !error && <p>Loading...</p>}
      {user && (
        <div style={cardStyle}>
          <div style={avatarStyle}>{(record?.name || user.username)[0].toUpperCase()}</div>
          <h3 style={{ margin: "12px 0 4px" }}>{record?.name || user.username}</h3>
          <p style={{ margin: "0 0 20px", color: "#64748b" }}>Teacher</p>

          {!editing && (
            <>
              {rows.map(([label, value]) => (
                <div key={label} style={rowStyle}>
                  <span style={{ color: "#64748b" }}>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
              <button onClick={startEdit} style={btnStyle}>Edit Details</button>
            </>
          )}

          {editing && (
            <form onSubmit={save}>
              <label style={labelStyle}>Name</label>
              <input style={inputStyle} value={form.name} required
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <label style={labelStyle}>Subject</label>
              <input style={inputStyle} value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })} />
              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <button type="submit" style={btnStyle}>Save</button>
                <button type="button" onClick={() => setEditing(false)}
                  style={{ ...btnStyle, background: "#e2e8f0", color: "#000" }}>Cancel</button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

const cardStyle = { background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 24, maxWidth: 520 };
const avatarStyle = { width: 64, height: 64, borderRadius: "50%", background: "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700 };
const rowStyle = { display: "flex", justifyContent: "space-between", padding: "12px 0", borderTop: "1px solid #eee" };
const errorStyle = { background: "#fee2e2", color: "#991b1b", padding: 12, borderRadius: 8, marginBottom: 16 };
const btnStyle = { background: "#1d4ed8", color: "#fff", border: "none", padding: "10px 18px", borderRadius: 8, cursor: "pointer", marginTop: 16 };
const labelStyle = { display: "block", marginTop: 12, marginBottom: 4, color: "#64748b" };
const inputStyle = { width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc", boxSizing: "border-box" };