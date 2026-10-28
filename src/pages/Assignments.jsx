import ResourcePage from "../components/ResourcePage";

export default function Assignments() {
  return (
    <ResourcePage
      title="Assignments"
      apiPath="assignments"
      columns={[
        { key: "title", label: "Title" },
        { key: "subject", label: "Subject" },
        { key: "due_date", label: "Due Date" },
        { key: "description", label: "Description" },
      ]}
      fields={{ title: "", subject: "", due_date: "", description: "" }}
    />
  );
}