import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Login from "./Login";
import Register from "./Register";
import StudentProfile from "./StudentProfile";

const API_URL = "http://127.0.0.1:8000";

async function readResponse(response) {
  const text = await response.text();
  let data = {};

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { detail: text };
    }
  }

  if (!response.ok) {
    const detail = data.detail;
    const message = Array.isArray(detail)
      ? detail.map((item) => item.msg).join(", ")
      : detail || `Request failed (${response.status})`;

    throw new Error(message);
  }

  return data;
}

function App() {
  const [page, setPage] = useState(
    localStorage.getItem("access_token") ? "dashboard" : "login"
  );

  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [loading, setLoading] = useState(false);

  const apiFetch = useCallback(async (url, options = {}) => {
    const accessToken = localStorage.getItem("access_token");
    const headers = { ...options.headers };

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    return fetch(url, { ...options, headers });
  }, []);

  const fetchStudents = useCallback(async () => {
    try {
      const response = await apiFetch(`${API_URL}/students/`);
      const data = await readResponse(response);

      const records = Array.isArray(data)
        ? data
        : Array.isArray(data.students)
          ? data.students
          : null;

      if (!records) {
        throw new Error("Unexpected student list response.");
      }

      setStudents(records);

      // Keep the selected profile synchronized with the latest records.
      setSelectedStudent((current) => {
        if (!current) return null;

        return (
          records.find((student) => student.id === current.id) ?? null
        );
      });
    } catch (error) {
      setMessage(`Unable to load students: ${error.message}`);
      setMessageType("error");
    }
  }, [apiFetch]);

  useEffect(() => {
    if (page === "dashboard") {
      fetchStudents();
    }
  }, [page, fetchStudents]);

  const handleLogin = () => {
    setMessage("");
    setPage("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setSelectedStudent(null);
    setStudents([]);
    setMessage("");
    setPage("login");
  };

  // Add a new student.
  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const studentData = {
      name: String(formData.get("name")).trim(),
      email: String(formData.get("email")).trim(),
      age: Number(formData.get("age")),
      course: String(formData.get("course")).trim(),
    };

    setLoading(true);
    setMessage("");

    try {
      const response = await apiFetch(`${API_URL}/students/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentData),
      });

      await readResponse(response);

      setMessage("Student added successfully!");
      setMessageType("success");
      form.reset();

      await fetchStudents();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // Update an existing student.
  const handleUpdate = async (id, updatedData) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await apiFetch(`${API_URL}/students/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const data = await readResponse(response);

      // Use the updated record returned by the API when available.
      const updatedStudent =
        data &&
        typeof data === "object" &&
        data.id != null
          ? data
          : { ...updatedData, id };

      setStudents((previousStudents) =>
        previousStudents.map((student) =>
          student.id === id ? updatedStudent : student
        )
      );

      setSelectedStudent(updatedStudent);
      setMessage("Student details updated successfully!");
      setMessageType("success");

      return true;
    } catch (error) {
      setMessage(`Update failed: ${error.message}`);
      setMessageType("error");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Delete a student.
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student record?")) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await apiFetch(`${API_URL}/students/${id}`, {
        method: "DELETE",
      });

      await readResponse(response);

      if (selectedStudent?.id === id) {
        setSelectedStudent(null);
      }

      setMessage("Student deleted successfully!");
      setMessageType("success");

      await fetchStudents();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  if (page === "login") {
    return (
      <Login
        onLogin={handleLogin}
        onRegister={() => setPage("register")}
      />
    );
  }

  if (page === "register") {
    return (
      <Register
        onLogin={() => setPage("login")}
      />
    );
  }

  // Show the full details only after View Profile is clicked.
  if (selectedStudent) {
    return (
      <StudentProfile
        student={selectedStudent}
        onBack={() => {
          setSelectedStudent(null);
          setMessage("");
        }}
        onUpdate={handleUpdate}
        loading={loading}
      />
    );
  }

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="sidebar-logo">S</span>
          <span>Student System</span>
        </div>

        <button
          className="sidebar-link active"
          type="button"
        >
          <span>▦</span> Students
        </button>

        <button
          className="sidebar-link"
          type="button"
          onClick={() => {
            if (students.length > 0) {
              setSelectedStudent(students[0]);
            } else {
              setMessage("Add a student before opening a profile.");
              setMessageType("error");
            }
          }}
        >
          <span>♙</span> Profile
        </button>

        <button
          className="sidebar-link"
          type="button"
          onClick={handleLogout}
        >
          <span>⇥</span> Logout
        </button>

        <div className="sidebar-footer">
          Better Students
          <br />
          Better Tomorrow
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div>
            <h1>Student Management System</h1>
            <p>Manage your student information in one place</p>
          </div>

          <span className="user-pill">● Student Admin</span>
        </header>

        {message && (
          <div className={`alert ${messageType}`} role="status">
            {message}
          </div>
        )}

        <section className="dashboard-panel">
          <div className="panel-heading">
            <h2>Add New Student</h2>
            <p>Enter the student's details below</p>
          </div>

          <form className="student-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="student-name">Full Name</label>
              <input
                id="student-name"
                name="name"
                type="text"
                placeholder="Enter student name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="student-email">Email Address</label>
              <input
                id="student-email"
                name="email"
                type="email"
                placeholder="example@gmail.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="student-age">Age</label>
              <input
                id="student-age"
                name="age"
                type="number"
                min="1"
                placeholder="Enter age"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="student-course">Course</label>
              <input
                id="student-course"
                name="course"
                type="text"
                placeholder="Python, Java, React"
                required
              />
            </div>

            <button
              className="primary-button form-submit"
              type="submit"
              disabled={loading}
            >
              {loading ? "Adding..." : "+ Add Student"}
            </button>
          </form>
        </section>

        <section className="dashboard-panel records-panel">
          <div className="records-header">
            <div>
              <h2>Student Records</h2>
              <p>View and manage registered students</p>
            </div>

            <button
              className="refresh-button"
              type="button"
              onClick={fetchStudents}
            >
              ↻ Refresh
            </button>
          </div>

          <div className="total-count">
            Total students: <strong>{students.length}</strong>
          </div>

          {students.length === 0 ? (
            <div className="empty-state">
              No students found. Add your first student above.
            </div>
          ) : (
            <div className="student-grid">
              {students.map((student) => (
                <article className="student-card" key={student.id}>
                  <div className="student-card-header">
                    <div className="student-avatar">
                      {(student.name || "S")
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="student-card-title">
                      <h3>{student.name}</h3>
                      <span>ID: {student.id}</span>
                    </div>
                  </div>

                  {/* Full details are shown on the profile page only. */}
                  <div className="card-actions">
                    <button
                      type="button"
                      className="view-button"
                      onClick={() => {
                        setMessage("");
                        setSelectedStudent(student);
                      }}
                    >
                      View Profile
                    </button>

                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => handleDelete(student.id)}
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
