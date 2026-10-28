import { Link } from "react-router-dom";

const teacherCards = [
  { title: "My Classes", description: "View your assigned classes.", icon: "▦", path: "/classes", color: "#0d9488" },
  { title: "My Subjects", description: "View your assigned subjects.", icon: "▤", path: "/subjects", color: "#6366f1" },
  { title: "Attendance", description: "Record and manage attendance.", icon: "✓", path: "/attendance", color: "#ea580c" },
  { title: "Examinations", description: "View and manage examinations.", icon: "✎", path: "/examinations", color: "#0284c7" },
  { title: "Marks", description: "Enter and update examination marks.", icon: "★", path: "/marks", color: "#9333ea" },
  { title: "Results", description: "View and manage examination results.", icon: "▥", path: "/results", color: "#16a34a" },
  { title: "Fee Details", description: "View fee and payment information.", icon: "₹", path: "/fees", color: "#db2777" },
  { title: "Reports", description: "View academic reports.", icon: "📊", path: "/reports", color: "#ca8a04" },
];

export default function TeacherDashboard() {
  let user = {};
  try { user = JSON.parse(localStorage.getItem("user") || "{}"); } catch { user = {}; }
  const teacherName = user.name || user.full_name || user.username || user.email || "Teacher";
  const cardStyle = { background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "22px", boxShadow: "0 4px 14px rgba(15,23,42,0.04)", boxSizing: "border-box" };
  return (
    <div style={{ padding: "24px", background: "#f5f7fb", minHeight: "100%", color: "#172554", boxSizing: "border-box" }}>
      <div style={{ marginBottom: "28px" }}>
        <p style={{ color: "#64748b", margin: "0 0 8px", fontSize: "14px" }}>TEACHER PORTAL</p>
        <h1 style={{ fontSize: "28px", margin: "0 0 10px", fontWeight: 800 }}>Welcome, {teacherName}!</h1>
        <p style={{ color: "#64748b", margin: 0, lineHeight: 1.6 }}>Manage your classes, subjects, attendance, examinations, marks, results and reports.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "18px", marginBottom: "28px" }}>
        {teacherCards.map((card) => (
          <Link key={card.title} to={card.path} style={{ ...cardStyle, display: "block", color: "inherit", textDecoration: "none" }}>
            <div style={{ width: "46px", height: "46px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", background: `${card.color}18`, color: card.color, fontSize: "25px", fontWeight: 800, marginBottom: "18px" }}>{card.icon}</div>
            <h3 style={{ margin: "0 0 8px", fontSize: "17px" }}>{card.title}</h3>
            <p style={{ color: "#64748b", fontSize: "13px", lineHeight: 1.6, margin: 0 }}>{card.description}</p>
            <div style={{ marginTop: "18px", color: card.color, fontWeight: 700, fontSize: "13px" }}>View details →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}