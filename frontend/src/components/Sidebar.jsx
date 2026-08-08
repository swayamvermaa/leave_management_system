// export default Sidebar;
import { NavLink } from "react-router-dom";
import { sidebarMenus } from "../config/sidebarMenu";
import {
  FaHome,
  FaFileAlt,
  FaHistory,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { firebaseLogout } from "../api/authApi";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const menuItems = sidebarMenus[user?.role] || [];
  const isTabletOrMobile = window.innerWidth < 992;

  return (
    <>
  {sidebarOpen && isTabletOrMobile &&  (
  <div
    className="position-fixed"
      style={{
        display: window.innerWidth < 992 ? "block" : "none",
        background: "rgba(0,0,0,0.5)",
        zIndex: 1040,
      }}
      onClick={() => setSidebarOpen(false)}
    />
  )}

  <div
    className="bg-dark text-white d-flex flex-column position-fixed"
    style={{
      width:   window.innerWidth < 768
    ? "260px"
    : window.innerWidth < 992
    ? "220px"
    : "260px",
      height: "100vh",
      left: isTabletOrMobile
  ? (sidebarOpen ? "0" : "-260px")
  : "0",
      top: 0,
      zIndex: 1050,
      transition: "left 0.3s ease",
    }}
  >

      {/* Logo */}
      <div className="text-center py-4 border-bottom">
        <h4
          className="fw-bold"
          style={{
          fontSize:
          window.innerWidth < 992
          ? "22px"
          : "28px",
          }}
          >CDLMS</h4>
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
              onClick={() => {
                if (isTabletOrMobile) {
                  setSidebarOpen(false);
                }
              }}
              className={({ isActive }) =>
                `d-flex align-items-center text-decoration-none ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-light"
                }`
              }
              style={{
                padding:
                  window.innerWidth < 768
                    ? "12px 20px"
                    : window.innerWidth < 992
                    ? "14px 18px"
                    : "16px 24px",
                fontSize:
                  window.innerWidth < 768
                    ? "15px"
                    : window.innerWidth < 992
                    ? "16px"
                    : "17px",
                transition: "0.3s",
              }}
            >
              <span
                className="me-3"
                style={{
                  fontSize:
                    window.innerWidth < 768
                      ? "18px"
                      : window.innerWidth < 992
                      ? "20px"
                      : "22px",
                }}
              >
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
      </>
  );
}

export default Sidebar;