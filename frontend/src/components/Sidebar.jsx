// export default Sidebar;
import { NavLink } from "react-router-dom";
import { sidebarMenus } from "../config/sidebarMenu";
import {
  FaHome,
  FaFileAlt,
  FaHistory,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const menuItems = sidebarMenus[user?.role] || [];

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
        <small>{user?.role?.toUpperCase()} PANEL</small>
      </div>

      {/* Menu */}
      <div className="flex-grow-1 mt-3">
            {menuItems.map((item) => {
        const Icon = item.icon;

        return (
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
            <span className="me-3 fs-5">
              <Icon />
            </span>

            {item.name}
          </NavLink>
        );
      })}
      </div>

      {/* Logout */}
              <div className="border-top p-3">
        <button
          className="btn btn-danger w-100"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/";
            firebaseLogout();
            navigate("/");
          }}
        >
          <FaSignOutAlt className="me-2" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;