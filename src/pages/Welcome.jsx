import { Link } from "react-router-dom";
import HomeNavbar from "../components/HomeNavbar";
import "./Welcome.css";

export default function Welcome() {
  return (
    <div style={{ background: "#f8fafc" }}>
      <HomeNavbar />

      {/* HERO SECTION */}
      <main
        className="welcome-page"
        style={{ 
          backgroundImage: "url('/campus.jpg')",
          minHeight: "90vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div className="welcome-overlay" style={{position:"absolute", inset:0, background:"rgba(0,0,0,0.55)"}} />

        <section className="welcome-content" style={{position:"relative", textAlign:"center", color:"white", zIndex:2, padding:"40px"}}>
          <div className="welcome-icon" style={{fontSize:"50px"}}>🎓</div>
          <p className="welcome-eyebrow" style={{letterSpacing:"4px", fontSize:"12px", marginTop:"15px"}}>WELCOME TO OUR CAMPUS</p>
          <h1 style={{fontSize:"48px", margin:"15px 0"}}>Student Management System</h1>
          <p style={{fontSize:"18px", opacity:0.9}}>Manage Students • Track Attendance • Simplify Education</p>
          <Link to="/login" className="welcome-button" style={{display:"inline-block", marginTop:"25px", background:"white", color:"black", padding:"12px 28px", borderRadius:"8px", textDecoration:"none", fontWeight:"bold"}}>
            Get Started
          </Link>
        </section>
      </main>

      {/* ABOUT SECTION */}
      <section id="about" style={{padding:"70px 40px", background:"white", textAlign:"center"}}>
        <h2 style={{fontSize:"32px", fontWeight:"bold"}}>About Us</h2>
        <p style={{maxWidth:"700px", margin:"15px auto", color:"gray", lineHeight:"1.6"}}>
          Our Student Management System helps schools and colleges to manage students, teachers, attendance, fees, and results in one place. Simple, fast and secure.
        </p>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" style={{padding:"70px 40px", background:"#f1f5f9", textAlign:"center"}}>
        <h2 style={{fontSize:"32px", fontWeight:"bold"}}>Features</h2>
        <div style={{display:"flex", gap:"20px", justifyContent:"center", marginTop:"30px", flexWrap:"wrap"}}>
          <div style={{background:"white", padding:"25px", borderRadius:"12px", width:"250px", boxShadow:"0 2px 8px rgba(0,0,0,0.08)"}}>📚<h3>Student Management</h3><p style={{color:"gray", fontSize:"14px"}}>Add, edit, view all students easily</p></div>
          <div style={{background:"white", padding:"25px", borderRadius:"12px", width:"250px", boxShadow:"0 2px 8px rgba(0,0,0,0.08)"}}>📝<h3>Attendance</h3><p style={{color:"gray", fontSize:"14px"}}>Track daily attendance</p></div>
          <div style={{background:"white", padding:"25px", borderRadius:"12px", width:"250px", boxShadow:"0 2px 8px rgba(0,0,0,0.08)"}}>💰<h3>Fees Management</h3><p style={{color:"gray", fontSize:"14px"}}>Manage fees and payments</p></div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" style={{padding:"70px 40px", background:"white", textAlign:"center"}}>
        <h2 style={{fontSize:"32px", fontWeight:"bold"}}>Contact</h2>
        <p style={{color:"gray", marginTop:"10px"}}>Email: support@sms.com | Phone: +91 1234567890</p>
      </section>
    </div>
  );
}