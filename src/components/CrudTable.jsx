export default function CrudTable({ columns, data, onEdit, onDelete, readOnly = false }) {
  const rows = Array.isArray(data) ? data : [];

  return (
    <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f8fafc" }}>
            {columns.map((c) => (
              <th key={c.key} style={{ padding: 12, textAlign: "left", color: "#1e40af" }}>{c.label}</th>
            ))}
            {!readOnly && <th style={{ padding: 12, textAlign: "left", color: "#1e40af" }}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length + (readOnly ? 0 : 1)} style={{ padding: 20, textAlign: "center", color: "#64748b" }}>
                No records found
              </td>
            </tr>
          )}
          {rows.map((row, i) => (
            <tr key={row.id ?? i} style={{ borderTop: "1px solid #eee" }}>
              {columns.map((c) => (
                <td key={c.key} style={{ padding: 12 }}>{row[c.key]}</td>
              ))}
              {!readOnly && (
                <td style={{ padding: 12 }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => onEdit(row)} style={{ background: "#dbeafe", border: "none", padding: "4px 10px", borderRadius: 6, cursor: "pointer" }}>Edit</button>
                    <button onClick={() => onDelete(row.id)} style={{ background: "#fee2e2", border: "none", padding: "4px 10px", borderRadius: 6, cursor: "pointer" }}>Delete</button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}