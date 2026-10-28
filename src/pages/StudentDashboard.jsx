import { Link } from "react-router-dom";

const studentCards = [
  { title: "My Attendance", description: "View your attendance records.", icon: "✓", path: "/student-attendance", color: "#0d9488" },
  { title: "My Results", description: "Check your examination results.", icon: "★", path: "/student-results", color: "#6366f1" },
  { title: "Assignments", description: "View and submit your assignments.", icon: "📝", path: "/student-assignments", color: "#7c3aed" },
  { title: "My Fees", description: "View fees and outstanding dues.", icon: "₹", path: "/student-fees", color: "#ea580c" },
  { title: "My Payments", description: "View your payment history.", icon: "💳", path: "/student-payments", color: "#0891b2" },
  { title: "Subjects", description: "View your subjects and course details.", icon: "📚", path: "/subjects", color: "#0284c7" },
  { title: "Help & Support", description: "Get help and contact support.", icon: "?", path: "/help-support", color: "#059669" },
];

export default function StudentDashboard() {
  let user = {};
  try { user = JSON.parse(localStorage.getItem("user") || "{}"); } catch { user = {}; }
  const studentName = user.name || user.full_name || user.username || "Student";
  const cardStyle = { background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "22px", boxShadow: "0 4px 14px rgba(15,23,42,0.04)" };
  return (
    <div style={{ padding: "24px", background: "#f5f7fb", minHeight: "100%", color: "#172554", boxSizing: "border-box" }}>
      <div style={{ marginBottom: "28px" }}>
        <p style={{ color: "#64748b", margin: "0 0 8px", fontSize: "14px" }}>STUDENT PORTAL</p>
        <h1 style={{ fontSize: "28px", margin: "0 0 10px", fontWeight: 800 }}>Welcome, {studentName}!</h1>
        <p style={{ color: "#64748b", margin: 0, lineHeight: 1.6 }}>View your academic info, assignments, fees, payments and support.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "18px", marginBottom: "28px" }}>
        {studentCards.map((card) => (
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