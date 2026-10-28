const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

// List endpoints that need a trailing slash so the backend doesn't redirect (307)
const LIST_PATHS = [
  "/api/classes",
  "/api/subjects",
  "/api/assignments",
  "/api/exams",
  "/api/attendance",
];

export const apiRequest = async (url, method = "GET", data = undefined) => {
  const headers = {};
  const token = localStorage.getItem("access_token");

  if (data !== undefined && data !== null) {
    headers["Content-Type"] = "application/json";
  }

  if (token && !url.endsWith("/login") && !url.endsWith("/register")) {
    headers.Authorization = `Bearer ${token}`;
  }

  const options = { method, headers };
  if (data !== undefined && data !== null) {
    options.body = JSON.stringify(data);
  }

  // Add the trailing slash when needed (keeps any ?query part)
  const [path, query] = url.split("?");
  const fixedPath = LIST_PATHS.includes(path) ? `${path}/` : path;
  const finalUrl = query ? `${fixedPath}?${query}` : fixedPath;

  let response;
  try {
    response = await fetch(`${API_URL}${finalUrl}`, options);
  } catch {
    throw new Error("Cannot reach the server. Is the backend running on port 8000?");
  }

  const contentType = response.headers.get("content-type") || "";
  const result = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    let detail = result;
    if (typeof result === "object" && result !== null) {
      detail = result.detail || result.message;
      if (Array.isArray(detail)) {
        detail = detail
          .map((d) => `${(d.loc || []).slice(1).join(".")}: ${d.msg}`)
          .join(", ");
      }
    }

    if (response.status === 401 && !url.endsWith("/login")) {
      localStorage.clear();
      window.location.href = "/login";
    }

    const error = new Error(detail || "Request failed");
    error.response = { data: result };
    throw error;
  }

  return result;
};

const api = {
  get: (url) => apiRequest(url, "GET"),
  post: (url, data) => apiRequest(url, "POST", data),
  put: (url, data) => apiRequest(url, "PUT", data),
  delete: (url) => apiRequest(url, "DELETE"),
};

export default api;