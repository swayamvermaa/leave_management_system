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
import ApprovedLeave from "./pages/ApprovedLeave";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import Settings from "./pages/Settings";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";



function App() {
  const location = useLocation();
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    setPageLoading(true);

    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 500); // adjust time if needed

    return () => clearTimeout(timer);
  }, [location.pathname]);
  return (
     <>

      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
          style={{
            zIndex: 9999999,
          }}
      />

      {pageLoading && <Loader />}
       
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
        path="/approved-leaves"
        element={<ApprovedLeave />}
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

    <Route
        path="/settings"
        element={<Settings />}
    />

    </Routes>
    
    </>
  );
}

export default App;