import ResourcePage from "../components/ResourcePage";

export default function Students() {
  return (
    <ResourcePage
      title="Students"
      apiPath="students"
      columns={[
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "class_name", label: "Class" },
      ]}
      fields={{ name: "", email: "", class_name: "" }}
    />
  );
}