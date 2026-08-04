import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";


function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isTabletOrMobile, setIsTabletOrMobile] = useState(
  window.innerWidth < 992
);

useEffect(() => {
  const handleResize = () => {
    setIsTabletOrMobile(window.innerWidth < 992);
  };

  window.addEventListener("resize", handleResize);

  return () =>
    window.removeEventListener("resize", handleResize);
}, []);

  return (
    <div className="d-flex">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div
        className="flex-grow-1"
        style={{
            marginLeft: window.innerWidth >= 992 ? "260px" : "0",
  width: window.innerWidth >= 992 ? "calc(100% - 260px)" : "100%",
  overflowX: "hidden",
        }}
      >
        <Navbar setSidebarOpen={setSidebarOpen} />

        <div
          className="bg-light"
          style={{
            minHeight: "100vh",
            padding: window.innerWidth < 576
              ? "12px"
              : window.innerWidth < 992
              ? "20px"
              : "30px",
          }}
        >
          {children}
        </div>
      </div>

    </div>
  );
}

export default DashboardLayout;