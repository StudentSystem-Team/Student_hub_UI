import { useEffect, useState } from "react";
import api from "../services/api";

const CARDS = [
  ["total_students", "Total Students"],
  ["total_teachers", "Total Teachers"],
  ["total_classes", "Total Classes"],
  ["total_subjects", "Total Subjects"],
  ["total_exams", "Total Examinations"],
  ["attendance_records", "Attendance Records"],
  ["attendance_present", "Present Count"],
  ["average_marks", "Average Marks"],
  ["fees_collected", "Fees Collected (₹)"],
  ["fees_pending", "Fees Pending (₹)"],
];

export default function Reports() {
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await api.get("/api/reports/");
        setReport(data && typeof data === "object" ? data : {});
      } catch (e) {
        setError(e.message);
      }
    })();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>Reports</h2>
      {error && (
        <div style={{ background: "#fee2e2", color: "#991b1b", padding: 12, borderRadius: 8, marginBottom: 16 }}>
          {error}
        </div>
      )}
      {!report && !error && <p>Loading...</p>}
      {report && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
          {CARDS.map(([key, label]) => (
            <div key={key} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 20 }}>
              <div style={{ color: "#64748b", fontSize: 14 }}>{label}</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#1e40af", marginTop: 6 }}>
                {report[key] ?? 0}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}