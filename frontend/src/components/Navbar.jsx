// function Navbar() {
//   return (
//     <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4">
//       <div className="container-fluid">

//         <h4 className="mb-0 fw-bold text-primary">
//           Campus Duty Leave Management
//         </h4>

//         <div className="d-flex align-items-center">

//           <span className="me-3 fw-semibold">
//             Welcome, Student
//           </span>

//           <button className="btn btn-outline-danger btn-sm">
//             Logout
//           </button>

//         </div>

//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import { FaBell, FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4">

      <div className="container-fluid">

        {/* Left Side */}
        <h4 className="fw-bold text-primary mb-0">
          Campus Duty Leave Management
        </h4>

        {/* Right Side */}
        <div className="d-flex align-items-center">

          {/* Notification */}
          <button
            className="btn btn-light position-relative me-3"
          >
            <FaBell size={20} />

            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            >
              3
            </span>
          </button>

          {/* User Info */}
          <div className="d-flex align-items-center me-3">

            <FaUserCircle
              size={35}
              className="text-primary me-2"
            />

            <div>
              <h6 className="mb-0">Swayam Verma</h6>
              <small className="text-muted">
                Student
              </small>
            </div>

          </div>

          {/* Logout */}
          <button className="btn btn-outline-danger">
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;