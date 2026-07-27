import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import StudentLogin from "./pages/StudentLogin";
import WardenLogin from "./pages/WardenLogin";
import StudentRegister from "./pages/StudentRegister";
import WardenDashboard from "./pages/WardenDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import RoomsPage from "./pages/RoomsPage";
import StudentRoomDetails from "./pages/StudentRoomDetails";
import StudentsPage from "./pages/StudentsPage";
import ComplaintsPage from "./pages/ComplaintsPage";
import CommunityRequests from "./pages/CommunityRequests";
import StudentComplaints from "./pages/StudentComplaints";
import GatePassPage from "./pages/GatePassPage";
import StudentGatePass from "./pages/StudentGatePass";
import NoticesPage from "./pages/NoticesPage";
import StudentNotices from "./pages/StudentNotices";
import AlumniPage from "./pages/AlumniPage";
import StudentFeeStatus from "./pages/StudentFeeStatus";
import WardenCommunityRequests from "./pages/WardenCommunityRequests";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Student Login */}
        <Route
          path="/student-login"
          element={<StudentLogin />}
        />

        {/* Warden Login */}
        <Route
          path="/warden-login"
          element={<WardenLogin />}
        />

        {/*Student register */}
        <Route
          path="/student-register"
          element={<StudentRegister />}
        />

        {/* Dashboard */}
        <Route
          path="/warden-dashboard"
          element={<WardenDashboard />}
        />
        
         <Route
          path="/student-dashboard"
          element={<StudentDashboard />}
        />

        {/* Room Management */}
        <Route
          path="/rooms"
          element={<RoomsPage />}
        />

        <Route
          path="/room-details"
         element={<StudentRoomDetails />}
        />

        {/* Student Management */}
        <Route
          path="/students"
          element={<StudentsPage />}
        />

        {/* Alumni */}
        <Route
          path="/alumni"
          element={<AlumniPage />}
        />

        {/* Complaints */}
        <Route
          path="/complaints"
          element={<ComplaintsPage />}
        />

        <Route
          path="/warden-community-requests"
          element={<WardenCommunityRequests />}
        />

        <Route
          path="/community-requests"
          element={<CommunityRequests />}
        />

        <Route
          path="/student-complaints"
          element={<StudentComplaints />}
        />

        {/* GatePass */}
        <Route
          path="/gatepasses"
          element={<GatePassPage />}
        />

        <Route
          path="/student-gatepass"
          element={<StudentGatePass />}
        />

        {/* Notices */}
        <Route
          path="/notices"
          element={<NoticesPage />}
        />

        <Route
          path="/student-notices"
          element={<StudentNotices />}
        />
        <Route
          path="/fee-status"
          element={<StudentFeeStatus />}
        />
 </Routes>
    </BrowserRouter>
  );
}

export default App;