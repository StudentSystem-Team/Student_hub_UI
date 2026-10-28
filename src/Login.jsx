
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { apiRequest } from "./services/api";

export default function Login() {
  const [activeTab, setActiveTab] = useState("student");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  async function handleLogin(event) {
    event.preventDefault();
    setMessage("");

    if (!id.trim() || !password) {
      setMessage("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const data = await apiRequest("/auth/login", "POST", {
        username: id.trim().toLowerCase(),
        password,
      });

      if (!data.access_token) {
        throw new Error("The server did not return a login token.");
      }

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("token", data.access_token);

      const user = await apiRequest("/auth/me", "GET");
      const actualRole = String(user.role || "").toLowerCase();

      if (actualRole !== activeTab) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");

        setMessage(
          `This account is registered as ${actualRole}. Please select the correct login tab.`
        );
        return;
      }

      localStorage.setItem("role", actualRole);
      localStorage.setItem("user", JSON.stringify(user));

      if (actualRole === "student") {
        navigate("/student-dashboard", { replace: true });
      } else if (actualRole === "teacher") {
        navigate("/teacher-dashboard", { replace: true });
      } else {
        localStorage.removeItem("access_token");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");

        setMessage("Only student and teacher login is available here.");
      }
    } catch (error) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");

      setMessage(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <div style={tabsStyle}>
          {["student", "teacher"].map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => {
                setActiveTab(role);
                setMessage("");
              }}
              style={{
                ...tabStyle,
                background:
                  activeTab === role ? "#2563eb" : "transparent",
              }}
            >
              {role === "student" ? "Student" : "Teacher"}
            </button>
          ))}
        </div>

        <h1 style={headingStyle}>
          {activeTab === "student" ? "Student Login" : "Teacher Login"}
        </h1>

        <p style={subtitleStyle}>
          Login to your {activeTab} account
        </p>

        {location.state?.message && (
          <p style={successStyle}>{location.state.message}</p>
        )}

        <form onSubmit={handleLogin}>
          <label htmlFor="login-id" style={labelStyle}>
            Email Address
          </label>

          <input
            id="login-id"
            type="email"
            value={id}
            onChange={(event) => setId(event.target.value)}
            placeholder="Enter your registered email"
            autoComplete="username"
            style={inputStyle}
            required
          />

          <label htmlFor="login-password" style={labelStyle}>
            Password
          </label>

          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            style={inputStyle}
            required
          />

          {message && (
            <p role="alert" style={messageStyle}>
              {message}
            </p>
          )}

          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading
              ? "Checking..."
              : `Login as ${activeTab === "student" ? "Student" : "Teacher"}`}
          </button>
        </form>

        <p style={footerStyle}>
          Don't have an account?{" "}
          <Link to="/register" style={linkStyle}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundImage:
    "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  padding: 20,
  boxSizing: "border-box",
};

const cardStyle = {
  width: "100%",
  maxWidth: 440,
  background: "rgba(15,23,42,0.95)",
  backdropFilter: "blur(20px)",
  padding: 32,
  borderRadius: 20,
  boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
  border: "1px solid rgba(255,255,255,0.15)",
  boxSizing: "border-box",
};

const tabsStyle = {
  display: "flex",
  background: "#1e293b",
  borderRadius: 12,
  padding: 4,
  marginBottom: 24,
  gap: 4,
};

const tabStyle = {
  flex: 1,
  padding: 11,
  borderRadius: 8,
  border: "none",
  fontWeight: 700,
  cursor: "pointer",
  color: "white",
};

const headingStyle = {
  fontSize: 26,
  fontWeight: 800,
  color: "white",
  margin: "0 0 6px",
};

const subtitleStyle = {
  color: "#94a3b8",
  fontSize: 14,
  marginBottom: 20,
};

const labelStyle = {
  fontSize: 14,
  fontWeight: 600,
  color: "white",
  marginTop: 10,
  display: "block",
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 10,
  border: "1px solid #334155",
  background: "rgba(255,255,255,0.08)",
  color: "white",
  margin: "6px 0 10px",
  display: "block",
  outline: "none",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  marginTop: 20,
  padding: 14,
  background: "#2563eb",
  border: "none",
  borderRadius: 10,
  color: "white",
  fontWeight: 700,
  fontSize: 15,
  cursor: "pointer",
};

const messageStyle = {
  color: "#fca5a5",
  fontSize: 14,
  marginTop: 12,
};

const successStyle = {
  color: "#86efac",
  fontSize: 14,
  marginBottom: 14,
};

const footerStyle = {
  textAlign: "center",
  marginTop: 16,
  color: "white",
  fontSize: 14,
};

const linkStyle = {
  color: "#60a5fa",
  cursor: "pointer",
  fontWeight: 600,
  textDecoration: "none",
};
