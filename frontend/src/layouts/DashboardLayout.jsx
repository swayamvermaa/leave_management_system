// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";

// function DashboardLayout({ children }) {
//   return (
//     <>
//       <Navbar />

//       <div className="d-flex">

//         <Sidebar />

//         <div
//           className="flex-grow-1 p-4 bg-light"
//           style={{ minHeight: "100vh" }}
//         >
//           {children}
//         </div>

//       </div>
//     </>
//   );
// }

// export default DashboardLayout;
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="d-flex">

      <Sidebar />

      <div className="flex-grow-1">

        <Navbar />

        <div className="p-4 bg-light" style={{ minHeight: "100vh" }}>
          {children}
        </div>

      </div>

    </div>
  );
}

export default DashboardLayout;