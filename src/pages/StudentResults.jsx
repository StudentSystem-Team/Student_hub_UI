
import { useEffect, useState } from "react";
import api from "../services/api";

export default function StudentResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setError("");

        const data = await api.get("/api/results/");
        setResults(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Unable to load results.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  // Identify failed subjects from the actual result records.
  const backlogs = results.filter((item) => {
    const result = String(item.result || "").trim();
    const grade = String(item.grade || "").trim().toUpperCase();

    return (
      /\b(fail|failed|backlog)\b/i.test(result) ||
      grade === "F"
    );
  });

  // Extract the subject name from results such as
  // "Fail - Mathematics" or "Failed - Mathematics".
  const getSubject = (item) => {
    const result = String(item.result || "").trim();

    return result.replace(
      /^(fail|failed|backlog)\s*[-:]\s*/i,
      ""
    ) || "Subject name unavailable";
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.pageTitle}>My Results</h2>

      <p style={styles.subtitle}>
        View your examination results and backlog subjects.
      </p>

      {error && (
        <div style={styles.error}>
          {error}
        </div>
      )}

      {loading ? (
        <p>Loading your results...</p>
      ) : (
        <>
          {/* Backlog summary */}
          <section style={styles.backlogCard}>
            <div style={styles.backlogHeader}>
              <div>
                <h3 style={styles.backlogTitle}>
                  Backlog Summary
                </h3>
                <p style={styles.backlogSubtitle}>
                  Subjects that need to be cleared
                </p>
              </div>

              <div style={styles.countBadge}>
                {backlogs.length}
              </div>
            </div>

            <h4 style={styles.countText}>
              Total Backlogs: {backlogs.length}
            </h4>

            {backlogs.length > 0 ? (
              <div style={styles.subjectList}>
                {backlogs.map((item, index) => (
                  <div
                    key={item.id ?? `${getSubject(item)}-${index}`}
                    style={styles.subjectRow}
                  >
                    <div style={styles.subjectInfo}>
                      <span style={styles.subjectNumber}>
                        {index + 1}
                      </span>

                      <div>
                        <div style={styles.subjectName}>
                          {getSubject(item)}
                        </div>

                        <div style={styles.studentName}>
                          {item.student || "Student"}
                        </div>
                      </div>
                    </div>

                    <span style={styles.failBadge}>
                      Backlog
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={styles.noBacklogs}>
                <div style={styles.successIcon}>✓</div>
                <div style={styles.successTitle}>
                  No Backlogs
                </div>
                <p style={styles.successText}>
                  No failed subjects were found in your results.
                </p>
              </div>
            )}
          </section>

          {/* Existing results table */}
          <section style={styles.resultsSection}>
            <h3 style={styles.resultsTitle}>My Results</h3>

            {results.length > 0 ? (
              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Student</th>
                      <th style={styles.th}>Result</th>
                      <th style={styles.th}>Grade</th>
                    </tr>
                  </thead>

                  <tbody>
                    {results.map((item, index) => (
                      <tr key={item.id ?? index}>
                        <td style={styles.td}>
                          {item.student || "-"}
                        </td>

                        <td style={styles.td}>
                          {item.result || "-"}
                        </td>

                        <td style={styles.td}>
                          {item.grade || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p style={styles.emptyMessage}>
                No examination results available.
              </p>
            )}
          </section>
        </>
      )}
    </div>
  );
}

const styles = {
  page: {
    padding: "24px",
    color: "#1e293b",
  },

  pageTitle: {
    margin: "0 0 8px",
    fontSize: "26px",
    color: "#173568",
  },

  subtitle: {
    margin: "0 0 24px",
    color: "#64748b",
  },

  error: {
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "8px",
    color: "#991b1b",
    background: "#fee2e2",
  },

  backlogCard: {
    padding: "24px",
    marginBottom: "30px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)",
  },

  backlogHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
  },

  backlogTitle: {
    margin: "0 0 6px",
    fontSize: "21px",
    color: "#173568",
  },

  backlogSubtitle: {
    margin: 0,
    color: "#64748b",
    fontSize: "14px",
  },

  countBadge: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "56px",
    height: "56px",
    padding: "0 12px",
    borderRadius: "14px",
    background: "#fee2e2",
    color: "#b91c1c",
    fontSize: "24px",
    fontWeight: "700",
  },

  countText: {
    margin: "22px 0 16px",
    fontSize: "17px",
  },

  subjectList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  subjectRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    padding: "15px",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    background: "#f8fafc",
  },

  subjectInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  subjectNumber: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "34px",
    height: "34px",
    borderRadius: "9px",
    background: "#e2e8f0",
    color: "#334155",
    fontWeight: "600",
  },

  subjectName: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#1e293b",
  },

  studentName: {
    marginTop: "4px",
    fontSize: "12px",
    color: "#64748b",
  },

  failBadge: {
    padding: "6px 11px",
    borderRadius: "20px",
    background: "#fee2e2",
    color: "#b91c1c",
    fontSize: "12px",
    fontWeight: "700",
    whiteSpace: "nowrap",
  },

  noBacklogs: {
    padding: "24px 12px",
    textAlign: "center",
    background: "#f0fdf4",
    borderRadius: "10px",
  },

  successIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    marginBottom: "8px",
    borderRadius: "50%",
    background: "#dcfce7",
    color: "#15803d",
    fontSize: "24px",
    fontWeight: "700",
  },

  successTitle: {
    color: "#166534",
    fontSize: "17px",
    fontWeight: "700",
  },

  successText: {
    marginBottom: 0,
    color: "#166534",
    fontSize: "14px",
  },

  resultsSection: {
    marginTop: "10px",
  },

  resultsTitle: {
    marginBottom: "18px",
    fontSize: "22px",
    color: "#173568",
  },

  tableWrapper: {
    width: "100%",
    overflowX: "auto",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    background: "#ffffff",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },

  th: {
    padding: "14px",
    background: "#f8fafc",
    color: "#173568",
    borderBottom: "1px solid #e2e8f0",
  },

  td: {
    padding: "14px",
    borderBottom: "1px solid #e2e8f0",
    color: "#334155",
  },

  emptyMessage: {
    padding: "20px",
    background: "#ffffff",
    borderRadius: "10px",
    color: "#64748b",
  },
};
