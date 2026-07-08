// import { Routes, Route } from "react-router-dom";

// import Login from "./pages/Login";
// import StudentDashboard from "./pages/StudentDashboard";

// function App() {
//   return (
//     <Routes>

//       <Route path="/" element={<Login />} />

//       <Route
//         path="/student-dashboard"
//         element={<StudentDashboard />}
//       />

//     </Routes>
//   );
// }

// export default App;
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import ApplyLeave from "./pages/ApplyLeave";
import LeaveHistory from "./pages/LeaveHistory";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import MentorDashboard from "./pages/MentorDashboard";
import HODDashboard from "./pages/HODDashboard";

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
      path="/mentor-dashboard"
      element={<MentorDashboard />}
    />

    <Route
      path="/hod-dashboard"
      element={<HODDashboard />}
    />

    </Routes>

  );
}

export default App;