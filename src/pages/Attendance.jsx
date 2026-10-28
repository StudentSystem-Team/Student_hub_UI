import ResourcePage from "../components/ResourcePage";

export default function Attendance() {
  return (
    <ResourcePage
      title="Attendance"
      apiPath="attendance"
      columns={[
        { key: "student", label: "Student" },
        { key: "date", label: "Date" },
        { key: "status", label: "Status" },
      ]}
      fields={{ student: "", date: "", status: "" }}
    />
  );
}