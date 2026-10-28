import ResourcePage from "../components/ResourcePage";

export default function StudentExaminations() {
  return (
    <ResourcePage
      title="Examination Timetable"
      apiPath="exams"
      readOnly
      columns={[
        { key: "exam_name", label: "Exam" },
        { key: "class_name", label: "Class" },
        { key: "date", label: "Date" },
      ]}
      fields={{ exam_name: "", class_name: "", date: "" }}
    />
  );
}