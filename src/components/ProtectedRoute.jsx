import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles }) {
  const token = localStorage.getItem("access_token") || localStorage.getItem("token");
  const role = (localStorage.getItem("role") || "").toLowerCase();

  if (!token || !role) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={role === "student" ? "/student-dashboard" : "/teacher-dashboard"} replace />;
  }

  return <Outlet />;
}