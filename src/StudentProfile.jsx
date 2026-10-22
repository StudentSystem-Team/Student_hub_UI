
import { useEffect, useState } from "react";
import "./App.css";

function StudentProfile({
  student,
  onBack,
  onUpdate,
  loading = false,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    course: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name ?? "",
        email: student.email ?? "",
        age: student.age ?? "",
        course: student.course ?? "",
      });
    }
  }, [student]);

  if (!student) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <h1>Student not found</h1>

          <button
            className="profile-back-button"
            type="button"
            onClick={onBack}
          >
            Back to Students
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setError("");

    const updatedData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      age: Number(formData.age),
      course: formData.course.trim(),
    };

    if (
      !updatedData.name ||
      !updatedData.email ||
      !updatedData.course ||
      !Number.isFinite(updatedData.age) ||
      updatedData.age < 1
    ) {
      setError("Please enter valid details in all fields.");
      return;
    }

    if (!onUpdate) {
      setError("The update function is not configured.");
      return;
    }

    setSaving(true);

    try {
      const success = await onUpdate(student.id, updatedData);

      if (success) {
        setIsEditing(false);
      } else {
        setError("Unable to update the student. Please try again.");
      }
    } catch {
      setError("Unable to update the student. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: student.name ?? "",
      email: student.email ?? "",
      age: student.age ?? "",
      course: student.course ?? "",
    });

    setError("");
    setIsEditing(false);
  };

  const details = [
    { label: "Full Name", value: student.name },
    { label: "Email Address", value: student.email },
    { label: "Age", value: student.age },
    { label: "Course", value: student.course },
  ];

  return (
    <div className="profile-page">
      <button
        className="back-to-dashboard"
        type="button"
        onClick={onBack}
        disabled={saving || loading}
      >
        ← Back to Students
      </button>

      <section className="profile-card">
        <div className="profile-avatar">
          {(student.name || "S").charAt(0).toUpperCase()}
        </div>

        <h1 className="profile-name">
          {student.name || "Student"}
        </h1>

        <p className="profile-subtitle">Student Profile</p>

        <span className="profile-id">
          Student ID: {student.id ?? "Not available"}
        </span>

        {error && (
          <p role="alert" style={{ color: "#dc2626" }}>
            {error}
          </p>
        )}

        {isEditing ? (
          <form
            className="student-form"
            onSubmit={handleSave}
          >
            <div className="form-group">
              <label htmlFor="edit-name">Full Name</label>
              <input
                id="edit-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-email">Email Address</label>
              <input
                id="edit-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-age">Age</label>
              <input
                id="edit-age"
                name="age"
                type="number"
                min="1"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-course">Course</label>
              <input
                id="edit-course"
                name="course"
                type="text"
                value={formData.course}
                onChange={handleChange}
                required
              />
            </div>

            <button
              className="profile-back-button"
              type="submit"
              disabled={saving || loading}
            >
              {saving || loading
                ? "Saving..."
                : "Save Changes"}
            </button>

            <button
              className="back-to-dashboard"
              type="button"
              onClick={handleCancel}
              disabled={saving || loading}
            >
              Cancel
            </button>
          </form>
        ) : (
          <>
            <div className="profile-details">
              {details.map((item) => (
                <div
                  className="profile-detail"
                  key={item.label}
                >
                  <div className="detail-symbol">
                    {item.label === "Full Name"
                      ? "♙"
                      : item.label === "Email Address"
                        ? "✉"
                        : item.label === "Age"
                          ? "▦"
                          : "◇"}
                  </div>

                  <div className="profile-detail-text">
                    <span>{item.label}</span>
                    <strong>
                      {item.value !== undefined &&
                      item.value !== null &&
                      item.value !== ""
                        ? item.value
                        : "Not available"}
                    </strong>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="profile-back-button"
              type="button"
              onClick={() => {
                setError("");
                setIsEditing(true);
              }}
            >
              ✎ Edit Profile
            </button>
          </>
        )}

        <button
          className="back-to-dashboard"
          type="button"
          onClick={onBack}
          disabled={saving || loading}
        >
          ← Back to Students
        </button>
      </section>
    </div>
  );
}

export default StudentProfile;
