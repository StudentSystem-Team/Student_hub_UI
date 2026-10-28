import ResourcePage from "../components/ResourcePage";

export default function Classes() {
  const readOnly = (localStorage.getItem("role") || "") === "student";
  return (
    <ResourcePage
      title="Classes"
      apiPath="classes"
      readOnly={readOnly}
      columns={[
        { key: "name", label: "Name" },
        { key: "section", label: "Section" },
        { key: "strength", label: "Strength" },
      ]}
      fields={{ name: "", section: "", year: "",strength: 0 }}
    />
  );
}