import ResourcePage from "../components/ResourcePage";

export default function Payments() {
  return (
    <ResourcePage
      title="Payments"
      apiPath="payments"
      columns={[
        { key: "student", label: "Student" },
        { key: "amount", label: "Amount (₹)" },
        { key: "date", label: "Date" },
        { key: "method", label: "Method" },
      ]}
      fields={{ student: "", amount: 0, date: "", method: "" }}
    />
  );
}