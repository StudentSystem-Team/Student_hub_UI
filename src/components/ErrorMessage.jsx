
export default function ErrorMessage({
  message = "Something went wrong.",
  onRetry,
}) {
  return (
    <div className="error-message" role="alert">
      <span>{message}</span>

      {onRetry && (
        <button type="button" className="btn btn-danger" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
