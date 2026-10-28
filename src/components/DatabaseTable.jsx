
export default function DataTable({
  columns = [],
  data = [],
  loading = false,
  onEdit,
  onDelete,
  emptyMessage = "No records found.",
}) {
  if (loading) {
    return <div className="table-message">Loading records...</div>;
  }

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}

            {(onEdit || onDelete) && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                className="table-empty"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={row.id ?? index}>
                {columns.map((column) => (
                  <td key={column.key}>
                    {column.render
                      ? column.render(row[column.key], row)
                      : String(row[column.key] ?? "—")}
                  </td>
                ))}

                {(onEdit || onDelete) && (
                  <td>
                    {onEdit && (
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => onEdit(row)}
                      >
                        Edit
                      </button>
                    )}

                    {onDelete && (
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => onDelete(row)}
                        style={{ marginLeft: 8 }}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
