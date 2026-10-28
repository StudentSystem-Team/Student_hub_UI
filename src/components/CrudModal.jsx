export default function CrudModal({ form, setForm, onClose, onSave }) {
  const keys = Object.keys(form).filter((k) => k !== "id");

  const handleChange = (k, v) => {
    const isNumber = typeof form[k] === "number";
    setForm({ ...form, [k]: isNumber ? (v === "" ? 0 : Number(v)) : v });
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
      <form
        onSubmit={(e) => { e.preventDefault(); onSave(); }}
        style={{ background: "#fff", padding: 24, borderRadius: 12, width: 400, maxHeight: "90vh", overflowY: "auto" }}
      >
        {keys.map((k) => (
          <div key={k} style={{ marginBottom: 12 }}>
            <label style={{ textTransform: "capitalize", display: "block", marginBottom: 4 }}>
              {k.replace(/_/g, " ")}
            </label>
            <input
              type={typeof form[k] === "number" ? "number" : "text"}
              value={form[k] ?? ""}
              onChange={(e) => handleChange(k, e.target.value)}
              style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc", boxSizing: "border-box" }}
            />
          </div>
        ))}
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button type="submit" style={{ background: "#1d4ed8", color: "#fff", border: "none", padding: "8px 16px", borderRadius: 8, cursor: "pointer" }}>Save</button>
          <button type="button" onClick={onClose} style={{ background: "#e2e8f0", border: "none", padding: "8px 16px", borderRadius: 8, cursor: "pointer" }}>Cancel</button>
        </div>
      </form>
    </div>
  );
}