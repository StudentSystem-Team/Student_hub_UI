
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ onMenuClick }) {
  const location = useLocation();

  let user = {};

  try {
    user = JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    user = {};
  }

  const role = (
    localStorage.getItem("role") ||
    user.role ||
    ""
  ).toLowerCase();

  // Display the requested name according to the logged-in role.
  const userName =
    role === "teacher"
      ? "Hanushka"
      : role === "student"
      ? "Chinnu"
      : user.full_name ||
        user.fullName ||
        user.name ||
        "Admin";

  const profilePath =
    role === "teacher" || role === "admin"
      ? "/teacher-profile"
      : "/student-profile";

  const pageTitles = {
    "/student-dashboard": "Student Dashboard",
    "/teacher-dashboard": "Teacher Dashboard",
    "/student-profile": "My Profile",
    "/teacher-profile": "My Profile",
    "/student-attendance": "My Attendance",
    "/student-results": "My Results",
    "/student-fees": "My Fees",
    "/students": "Students",
    "/teachers": "Teachers",
    "/classes": "Classes",
    "/subjects": "Subjects",
    "/attendance": "Attendance",
    "/examinations": "Examinations",
    "/marks": "Marks",
    "/results": "Results",
    "/fees": "Fees",
    "/payments": "Payments",
    "/reports": "Reports",
  };

  const title = pageTitles[location.pathname] || "Dashboard";

  return (
    <header
      style={{
        minHeight: "72px",
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        padding: "12px 24px",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          minWidth: 0,
        }}
      >
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
          style={{
            border: "none",
            background: "#f1f5f9",
            width: "42px",
            height: "42px",
            flexShrink: 0,
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          ☰
        </button>

        <div style={{ minWidth: 0 }}>
          <h2
            style={{
              margin: 0,
              fontSize: "22px",
              fontWeight: 700,
              color: "#1e293b",
            }}
          >
            {title}
          </h2>

          <p
            style={{
              margin: "3px 0 0",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Welcome back, {userName}!
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "14px",
        }}
      >
        <div
          style={{
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            padding: "8px 12px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span>🔍</span>

          <input
            type="search"
            placeholder="Search..."
            aria-label="Search"
            style={{
              width: "100px",
              minWidth: 0,
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: "14px",
            }}
          />
        </div>

        <button
          type="button"
          aria-label="Notifications"
          title="Notifications"
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          🔔
        </button>

        <Link
          to={profilePath}
          title="View My Profile"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "#eff6ff",
            padding: "6px 12px",
            borderRadius: "30px",
            color: "#1e40af",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "#2563eb",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
            }}
          >
            {userName.charAt(0).toUpperCase()}
          </div>

          <div style={{ lineHeight: 1.3 }}>
            <div
              style={{
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
              {userName}
            </div>

            <div
              style={{
                fontSize: "12px",
                color: "#64748b",
              }}
            >
              My Profile
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
}
