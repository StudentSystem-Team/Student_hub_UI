import ResourcePage from "../components/ResourcePage";

export default function StudentFees() {
  return (
    <ResourcePage
      title="My Fees"
      apiPath="fees"
      readOnly
      columns={[
        { key: "student", label: "Student" },
        { key: "amount", label: "Amount (₹)" },
        { key: "status", label: "Status" },
      ]}
      fields={{ student: "", amount: 0, status: "" }}
    />
  );
}