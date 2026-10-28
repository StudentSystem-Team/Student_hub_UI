import ResourcePage from "../components/ResourcePage";

export default function StudentAttendance() {
  return (
    <ResourcePage
      title="My Attendance"
      apiPath="attendance"
      readOnly
      columns={[
        { key: "student", label: "Student" },
        { key: "date", label: "Date" },
        { key: "status", label: "Status" },
      ]}
      fields={{ student: "", date: "", status: "" }}
    />
  );
}