import ResourcePage from "../components/ResourcePage";

export default function Subjects() {
  const readOnly = (localStorage.getItem("role") || "") === "student";
  return (
    <ResourcePage
      title="Subjects"
      apiPath="subjects"
      readOnly={readOnly}
      columns={[
        { key: "name", label: "Name" },
        { key: "code", label: "Code" },
        { key: "teacher", label: "Teacher" },
      ]}
      fields={{ name: "", code: "", teacher: "" }}
    />
  );
}