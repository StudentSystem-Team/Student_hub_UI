import { useState } from "react";

const FAQS = [
  ["How do I view my attendance?", "Open My Attendance from the sidebar to see your attendance records."],
  ["Where can I see my results?", "Open My Results from the sidebar to check your examination results."],
  ["How do I check my fees and payments?", "Use My Fees for dues and My Payments for your payment history."],
  ["How do I update my profile?", "Click your name at the top right, then click Edit Details and save."],
  ["I forgot my password. What should I do?", "Contact the school office or your class teacher to get it reset."],
];

export default function HelpSupport() {
  const [open, setOpen] = useState(null);
  const [form, setForm] = useState({ subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ subject: "", message: "" });
  };

  return (
    <div style={{ padding: 24, maxWidth: 800 }}>
      <h2>Help & Support</h2>

      <div style={cardStyle}>
        <h3 style={{ marginTop: 0 }}>Contact Us</h3>
        <div style={rowStyle}>
          <span style={muted}>Email</span>
          <strong>support@college.edu</strong>
        </div>
        <div style={rowStyle}>
          <span style={muted}>Phone</span>
          <strong>+91 98000 00009</strong>
        </div>
        <div style={rowStyle}>
          <span style={muted}>Office hours</span>
          <strong>Mon - Sat, 9:00 AM - 5:00 PM</strong>
        </div>
      </div>

      <div style={cardStyle}>
        <h3 style={{ marginTop: 0 }}>Frequently Asked Questions</h3>
        {FAQS.map(([q, a], i) => (
          <div key={q} style={{ borderTop: "1px solid #eee", padding: "10px 0" }}>
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                background: "none",
                border: "none",
                width: "100%",
                textAlign: "left",
                fontWeight: 600,
                fontSize: 15,
                cursor: "pointer",
              }}
            >
              {open === i ? "−" : "+"} {q}
            </button>
            {open === i && (
              <p style={{ margin: "8px 0 0 16px", color: "#475569" }}>{a}</p>
            )}
          </div>
        ))}
      </div>

      <div style={cardStyle}>
        <h3 style={{ marginTop: 0 }}>Send Us a Message</h3>
        {sent && (
          <div
            style={{
              background: "#dcfce7",
              color: "#166534",
              padding: 10,
              borderRadius: 8,
              marginBottom: 12,
            }}
          >
            Your message has been sent. We will get back to you soon.
          </div>
        )}
        <form onSubmit={submit}>
          <input
            required
            placeholder="Subject"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            style={inputStyle}
          />
          <textarea
            required
            rows={4}
            placeholder="Describe your problem"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            style={{ ...inputStyle, marginTop: 10 }}
          />
          <button type="submit" style={btnStyle}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  border: "1px solid #e2e8f0",
  borderRadius: 12,
  padding: 24,
  marginTop: 16,
};
const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 0",
  borderTop: "1px solid #eee",
};
const muted = { color: "#64748b" };
const inputStyle = {
  width: "100%",
  padding: 10,
  borderRadius: 6,
  border: "1px solid #ccc",
  boxSizing: "border-box",
  fontFamily: "inherit",
};
const btnStyle = {
  background: "#1d4ed8",
  color: "#fff",
  border: "none",
  padding: "10px 18px",
  borderRadius: 8,
  cursor: "pointer",
  marginTop: 12,
};