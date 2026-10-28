import { useState, useEffect, useCallback } from "react";
import CrudTable from "./CrudTable";
import CrudModal from "./CrudModal";
import api from "../services/api";

// Remembers the last data for each page while the app is open.
// The key includes the login token, so one user never sees another user's data.
const dataCache = {};
const cacheKey = (base) =>
  `${localStorage.getItem("access_token") || localStorage.getItem("token") || ""}:${base}`;

export default function ResourcePage({ title, columns, fields, apiPath, readOnly = false }) {
  const base = `/api/${apiPath}`;

  // Start with the saved data (if any) so the page shows instantly
  const [data, setData] = useState(() => dataCache[cacheKey(base)] || []);
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(fields);
  const [error, setError] = useState("");
  // Only "loading" when we have nothing saved to show yet
  const [loading, setLoading] = useState(() => !dataCache[cacheKey(base)]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    const key = cacheKey(base);
    try {
      setError("");
      setRefreshing(true);
      const json = await api.get(`${base}/`);
      const rows = Array.isArray(json) ? json : json.data || [];
      dataCache[key] = rows;
      setData(rows);
    } catch (e) {
      setError(e.message);
      if (!dataCache[key]) setData([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [base]);

  // When the page changes (Students -> Subjects), show its saved data right away
  useEffect(() => {
    const saved = dataCache[cacheKey(base)];
    setData(saved || []);
    setLoading(!saved);
    fetchData();
  }, [base, fetchData]);

  const handleSave = async () => {
    try {
      setError("");
      if (editing) {
        const { id, ...body } = form;
        await api.put(`${base}/${id}`, body);
      } else {
        await api.post(`${base}/`, form);
      }
      setShow(false);
      setEditing(null);
      setForm(fields);
      fetchData();
    } catch (e) {
      setError(e.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    try {
      setError("");
      await api.delete(`${base}/${id}`);
      fetchData();
    } catch (e) {
      setError(e.message);
    }
  };

  const handleEdit = (row) => {
    setEditing(row);
    setForm(row);
    setShow(true);
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <h2>
          {title}
          {refreshing && !loading && (
            <span style={{ marginLeft: 12, fontSize: 13, color: "#64748b", fontWeight: 400 }}>
              Updating...
            </span>
          )}
        </h2>
        {!readOnly && (
          <button
            onClick={() => { setEditing(null); setForm(fields); setShow(true); }}
            style={{ background: "#1d4ed8", color: "#fff", padding: "10px 18px", border: "none", borderRadius: 8, cursor: "pointer" }}
          >
            + Add {title}
          </button>
        )}
      </div>

      {error && (
        <div style={{ background: "#fee2e2", color: "#991b1b", padding: 12, borderRadius: 8, marginBottom: 16 }}>
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ padding: 20, textAlign: "center", color: "#64748b" }}>Loading {title}...</div>
      ) : (
        <CrudTable columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} readOnly={readOnly} />
      )}

      {show && (
        <CrudModal form={form} setForm={setForm} onClose={() => setShow(false)} onSave={handleSave} />
      )}
    </div>
  );
}
