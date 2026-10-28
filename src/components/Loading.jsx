
export default function Loading({ message = "Loading..." }) {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <span className="loading-spinner" />
      <span>{message}</span>

      <style>{`
        .loading-state {
          min-height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: #64748b;
        }
        .loading-spinner {
          width: 25px;
          height: 25px;
          border: 3px solid #dbeafe;
          border-top-color: #2563eb;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
