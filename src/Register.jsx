
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "./services/api";

export default function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(event) {
    event.preventDefault();
    setMessage("");

    if (!name.trim() || !email.trim()) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      setMessage("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();

      await apiRequest("/auth/register", "POST", {
        username: normalizedEmail,
        password,
        role,
      });

      navigate("/login", {
        replace: true,
        state: {
          message: "Registration successful. Please log in.",
          email: normalizedEmail,
          role,
        },
      });
    } catch (error) {
      setMessage(error.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={headingStyle}>Create Account</h1>
        <p style={subtitleStyle}>Student Management System</p>
        <p style={descriptionStyle}>
          Register your student or teacher account
        </p>

        <form onSubmit={handleRegister}>
          <label htmlFor="register-role" style={labelStyle}>
            Register As
          </label>

          <select
            id="register-role"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            style={inputStyle}
            required
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>

          <label htmlFor="register-name" style={labelStyle}>
            Full Name
          </label>

          <input
            id="register-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your full name"
            maxLength={100}
            style={inputStyle}
            required
          />

          <label htmlFor="register-email" style={labelStyle}>
            Email Address
          </label>

          <input
            id="register-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            maxLength={255}
            style={inputStyle}
            required
          />

          <label htmlFor="register-password" style={labelStyle}>
            Password
          </label>

          <input
            id="register-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Create a password"
            minLength={8}
            autoComplete="new-password"
            style={inputStyle}
            required
          />

          <label htmlFor="register-confirm-password" style={labelStyle}>
            Confirm Password
          </label>

          <input
            id="register-confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Re-enter your password"
            minLength={8}
            autoComplete="new-password"
            style={inputStyle}
            required
          />

          {message && (
            <p role="alert" style={messageStyle}>
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              ...buttonStyle,
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading
              ? "Please wait..."
              : `Register as ${role === "student" ? "Student" : "Teacher"}`}
          </button>
        </form>

        <p style={footerStyle}>
          Already have an account?{" "}
          <Link to="/login" style={linkStyle}>
            Login
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
  backgroundRepeat: "no-repeat",
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

const headingStyle = {
  fontSize: 26,
  fontWeight: 800,
  color: "white",
  margin: "0 0 8px",
  textAlign: "center",
};

const subtitleStyle = {
  color: "white",
  fontSize: 18,
  fontWeight: 700,
  textAlign: "center",
  margin: "0 0 6px",
};

const descriptionStyle = {
  color: "#94a3b8",
  fontSize: 14,
  textAlign: "center",
  margin: "0 0 22px",
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
  background: "#172033",
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
  textAlign: "center",
};

const footerStyle = {
  textAlign: "center",
  marginTop: 20,
  color: "white",
  fontSize: 14,
};

const linkStyle = {
  color: "#60a5fa",
  fontWeight: 600,
  textDecoration: "none",
};
