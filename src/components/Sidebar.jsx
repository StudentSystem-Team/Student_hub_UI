import { NavLink, useNavigate } from "react-router-dom";

const studentMenu = [
  { label: "Dashboard", path: "/student-dashboard", icon: "▦" },
  { label: "Classes", path: "/classes", icon: "▤" },
  { label: "Subjects", path: "/subjects", icon: "▧" },
  { label: "Assignments", path: "/student-assignments", icon: "📝" },
  { label: "Examination Timetable", path: "/student-examinations", icon: "▣" },
  { label: "My Attendance", path: "/student-attendance", icon: "✓" },
  { label: "My Results", path: "/student-results", icon: "★" },
  { label: "My Fees", path: "/student-fees", icon: "₹" },
  { label: "My Payments", path: "/student-payments", icon: "💳" },
  { label: "Help & Support", path: "/help-support", icon: "?" },
];

const teacherMenu = [
  { label: "Dashboard", path: "/teacher-dashboard", icon: "▦" },
  { label: "Students", path: "/students", icon: "♙" },
  { label: "Teachers", path: "/teachers", icon: "♟" },
  { label: "Classes", path: "/classes", icon: "▤" },
  { label: "Subjects", path: "/subjects", icon: "▧" },
  { label: "Attendance", path: "/attendance", icon: "✓" },
  { label: "Examinations", path: "/examinations", icon: "✎" },
  { label: "Marks", path: "/marks", icon: "≡" },
  { label: "Results", path: "/results", icon: "★" },
  { label: "Reports", path: "/reports", icon: "📊" },
];

export default function Sidebar({ open = false, onClose }) {
  const navigate = useNavigate();
  let savedUser = {};
  try { savedUser = JSON.parse(localStorage.getItem("user") || "{}"); } catch { savedUser = {}; }
  const role = (localStorage.getItem("role") || savedUser.role || "").toLowerCase();
  const menuItems = role === "student" ? studentMenu : role === "teacher" ? teacherMenu : [];
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    if (onClose) onClose();
    navigate("/login", { replace: true });
  };
  return (
    <>
      {open && <button type="button" aria-label="Close sidebar" className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar sidebar-open dashboard-sidebar ${open ? "mobile-open" : ""}`} style={{ background: "#1a2d5a", display: "flex", flexDirection: "column", height: "100vh" }}>
        <div style={{ padding: "18px 16px", display: "flex", alignItems: "center", gap: "12px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ width: "40px", height: "40px", flexShrink: 0, borderRadius: "10px", background: "linear-gradient(135deg, #60a5fa, #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>🎓</div>
          <div>
            <div style={{ fontWeight: "800", color: "white", fontSize: "18px", lineHeight: "1.2" }}>{role === "teacher" ? "Teacher Portal" : "Student Portal"}</div>
            <div style={{ fontSize: "11px", color: "#93c5fd", letterSpacing: "0.5px" }}>Student Management</div>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", paddingTop: "16px" }}>
          <nav className="sidebar-navigation">
            {menuItems.map((item) => (
              <NavLink key={item.path} to={item.path} end={item.path.endsWith("dashboard")} onClick={onClose} className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`} style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none" }}>
                <span className="sidebar-icon">{item.icon}</span><span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
        <div style={{ paddingBottom: "12px" }}>
          <button type="button" onClick={handleLogout} className="sidebar-link" style={{ width: "100%", background: "transparent", border: "none", color: "rgba(255,255,255,0.85)", textAlign: "left", cursor: "pointer", fontFamily: "inherit", fontSize: "inherit" }}>
            <span className="sidebar-icon">↪</span><span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}