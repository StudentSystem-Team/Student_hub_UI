import { useNavigate } from "react-router-dom";

export default function HomeNavbar() {
  const navigate = useNavigate();

  return (
    <nav style={{
      width: "100%",
      height: "65px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 30px",
      background: "white",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      position: "sticky",
      top: 0,
      zIndex: 100
    }}>
      
      {/* LEFT - ONLY LOGO, NO BLUE BOX */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => navigate("/")}>
        <span style={{ fontSize: 26 }}>🎓</span>
        <span style={{ fontWeight: 800, fontSize: 20, color: "#1e293b" }}>CampusCore</span>
      </div>

      {/* CENTER - Home About Us Features */}
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <span style={{ fontWeight: 600, color: "#1e293b", fontSize: 14 }}>Home</span>
        <span style={{ fontWeight: 500, color: "#64748b", fontSize: 14 }}>About Us</span>
        <span style={{ fontWeight: 500, color: "#64748b", fontSize: 14 }}>Features</span>
      </div>

      {/* RIGHT - NO DROPDOWN - Direct Buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button
          onClick={() => navigate("/login")}
          style={{ background: "#2563eb", color: "white", border: "none", padding: "9px 22px", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer" }}
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          style={{ background: "white", color: "#334155", border: "1px solid #e2e8f0", padding: "9px 22px", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer" }}
        >
          Register
        </button>
      </div>
    </nav>
  );
}