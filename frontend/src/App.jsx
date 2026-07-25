import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import ApplyLeave from "./pages/ApplyLeave";
import LeaveHistory from "./pages/LeaveHistory";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import MentorDashboard from "./pages/MentorDashboard";
import HODDashboard from "./pages/HODDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ManageUsers from "./pages/ManageUsers";
import CreateUser from "./pages/CreateUser";
import ManageEvents from "./pages/ManageEvents";
import Profile from "./pages/Profile";
import AdminProfile from "./pages/AdminProfile";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/student-dashboard"
        element={<StudentDashboard />}
      />

      <Route
        path="/apply-leave"
        element={<ApplyLeave />}
      />

      <Route
        path="/leave-history"
        element={<LeaveHistory />}
      />

        <Route
      path="/organizer-dashboard"
      element={<OrganizerDashboard />}
      />

    <Route
      path="/mentor-dashboard"
      element={<MentorDashboard />}
    />

    <Route
      path="/hod-dashboard"
      element={<HODDashboard />}
    />

      <Route
      path="/signup"
      element={<Signup />}
    />

    <Route
      path="/admin-dashboard"
      element={<AdminDashboard />}
    />

    <Route
      path="/manage-users"
      element={<ManageUsers />}
    />

    <Route
      path="/create-user"
      element={<CreateUser />}
    />

    <Route
      path="/admin/events"
      element={<ManageEvents />}
    />

    <Route
      path="/profile"
      element={<Profile />}
    />

    <Route
      path="/admin-profile"
      element={<AdminProfile />}
    />

    </Routes>
    

  );
}

export default App;