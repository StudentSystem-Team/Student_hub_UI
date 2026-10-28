import ResourcePage from "../components/ResourcePage";

export default function Marks() {
  return (
    <ResourcePage
      title="Marks"
      apiPath="marks"
      columns={[
        { key: "student", label: "Student" },
        { key: "subject", label: "Subject" },
        { key: "marks", label: "Marks" },
      ]}
      fields={{ student: "", subject: "", marks: 0 }}
    />
  );
}