import ResourcePage from "../components/ResourcePage";

export default function Fees() {
  return (
    <ResourcePage
      title="Fees"
      apiPath="fees"
      columns={[
        { key: "student", label: "Student" },
        { key: "amount", label: "Amount (₹)" },
        { key: "status", label: "Status" },
      ]}
      fields={{ student: "", amount: 0, status: "" }}
    />
  );
}