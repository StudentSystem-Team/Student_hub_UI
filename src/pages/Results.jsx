import ResourcePage from "../components/ResourcePage";

export default function Results() {
  return (
    <ResourcePage
      title="Results"
      apiPath="results"
      columns={[
        { key: "student", label: "Student" },
        { key: "result", label: "Result" },
        { key: "grade", label: "Grade" },
      ]}
      fields={{ student: "", grade: "", result: "" }}
    />
  );
}