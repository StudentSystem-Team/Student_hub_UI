import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Welcome from "./pages/Welcome";
import Login from "./Login";
import Register from "./Register";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Classes from "./pages/Classes";
import Subjects from "./pages/Subjects";
import Attendance from "./pages/Attendance";
import Examinations from "./pages/Examinations";
import Marks from "./pages/Marks";
import Results from "./pages/Results";
import Fees from "./pages/Fees";
import Payments from "./pages/Payments";
import Reports from "./pages/Reports";
import StudentProfile from "./pages/StudentProfile";
import TeacherProfile from "./pages/TeacherProfile";
import StudentAttendance from "./pages/StudentAttendance";
import StudentResults from "./pages/StudentResults";
import StudentFees from "./pages/StudentFees";
import StudentExaminations from "./pages/StudentExaminations";
import StudentAssignments from "./pages/StudentAssignments";
import StudentPayments from "./pages/StudentPayments";
import HelpSupport from "./pages/HelpSupport";

function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-code">404</div>
      <h1>Page Not Found</h1>
      <p>The page you requested does not exist.</p>
      <a href="/" className="btn btn-primary">Back to Home</a>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute allowedRoles={["student", "teacher", "admin"]} />}>
        <Route element={<AppLayout />}>
          <Route path="/classes" element={<Classes />} />
          <Route path="/subjects" element={<Subjects />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
        <Route element={<AppLayout />}>
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/student-profile" element={<StudentProfile />} />
          <Route path="/student-examinations" element={<StudentExaminations />} />
          <Route path="/student-attendance" element={<StudentAttendance />} />
          <Route path="/student-results" element={<StudentResults />} />
          <Route path="/student-fees" element={<StudentFees />} />
          <Route path="/student-assignments" element={<StudentAssignments />} />
          <Route path="/student-payments" element={<StudentPayments />} />
          <Route path="/help-support" element={<HelpSupport />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["teacher", "admin"]} />}>
        <Route element={<AppLayout />}>
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher-profile" element={<TeacherProfile />} />
          <Route path="/students" element={<Students />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/examinations" element={<Examinations />} />
          <Route path="/marks" element={<Marks />} />
          <Route path="/results" element={<Results />} />
          <Route path="/fees" element={<Fees />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Route>

      <Route path="/dashboard" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}