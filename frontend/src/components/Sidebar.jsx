// import { Link } from "react-router-dom";
// import {
//   FaHome,
//   FaFileAlt,
//   FaHistory,
// } from "react-icons/fa";

// function Sidebar() {
//   return (
//     <div
//       className="bg-dark text-white p-3"
//       style={{
//         width: "250px",
//         minHeight: "100vh",
//       }}
//     >
//       <h4 className="text-center mb-4">
//         Dashboard
//       </h4>

//       <ul className="nav flex-column">

//         <li className="nav-item mb-3">
//           <Link
//             to="/student-dashboard"
//             className="nav-link text-white"
//           >
//             <FaHome className="me-2" />
//             Dashboard
//           </Link>
//         </li>

//         <li className="nav-item mb-3">
//           <Link
//             to="/apply-leave"
//             className="nav-link text-white"
//           >
//             <FaFileAlt className="me-2" />
//             Apply Leave
//           </Link>
//         </li>

//         <li className="nav-item mb-3">
//           <Link
//             to="/leave-history"
//             className="nav-link text-white"
//           >
//             <FaHistory className="me-2" />
//             Leave History
//           </Link>
//         </li>

//       </ul>
//     </div>
//   );
// }

// export default Sidebar;
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaFileAlt,
  FaHistory,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/student-dashboard",
      icon: <FaHome />,
    },
    {
      name: "Apply Leave",
      path: "/apply-leave",
      icon: <FaFileAlt />,
    },
    {
      name: "Leave History",
      path: "/leave-history",
      icon: <FaHistory />,
    },
  ];

  return (
    <div
      className="sidebar bg-dark text-white d-flex flex-column"
      style={{
        minHeight: "100vh",
      }}
    >
      {/* Logo */}
      <div className="text-center py-4 border-bottom">
        <h4 className="fw-bold">CDLMS</h4>
        <small>Student Panel</small>
      </div>

      {/* Menu */}
      <div className="flex-grow-1 mt-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `d-flex align-items-center text-decoration-none px-4 py-3 ${
                isActive
                  ? "bg-primary text-white"
                  : "text-light"
              }`
            }
          >
            <span className="me-3 fs-5">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </div>

      {/* Logout */}
      <div className="border-top p-3">
        <button className="btn btn-danger w-100">
          <FaSignOutAlt className="me-2" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;