import ResourcePage from "../components/ResourcePage";

export default function Teachers() {
  return (
    <ResourcePage
      title="Teachers"
      apiPath="teachers"
      columns={[
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "subject", label: "Subject" },
      ]}
      fields={{ name: "", email: "", subject: "" }}
    />
  );
}