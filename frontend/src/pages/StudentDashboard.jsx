// import DashboardLayout from "../layouts/DashboardLayout";

// function StudentDashboard() {
//   return (
//     <DashboardLayout>

//       <h2 className="fw-bold">
//         Student Dashboard
//       </h2>

//       <p className="text-muted">
//         Welcome to the Campus Duty Leave Management System.
//       </p>

//     </DashboardLayout>
//   );
// }

// export default StudentDashboard;
import DashboardLayout from "../layouts/DashboardLayout";
import { FaFileAlt, FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function StudentDashboard() {
  return (
    <DashboardLayout>
      {/* Page Heading */}
      <div className="mb-4">
        <h2 className="fw-bold">Student Dashboard</h2>
        <p className="text-muted">
          Welcome to the Campus Duty Leave Management System.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="row g-4">

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <FaFileAlt className="text-primary fs-1 mb-3" />
              <h3>12</h3>
              <p className="text-muted mb-0">Total Leaves</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <FaClock className="text-warning fs-1 mb-3" />
              <h3>3</h3>
              <p className="text-muted mb-0">Pending</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <FaCheckCircle className="text-success fs-1 mb-3" />
              <h3>8</h3>
              <p className="text-muted mb-0">Approved</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0 h-100">
            <div className="card-body text-center">
              <FaTimesCircle className="text-danger fs-1 mb-3" />
              <h3>1</h3>
              <p className="text-muted mb-0">Rejected</p>
            </div>
          </div>
        </div>

      </div>

      {/* Recent Leave Requests */}
      <div className="card shadow-sm mt-5 border-0">

        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Recent Leave Requests</h5>
        </div>

        <div className="card-body">

          <div className="table-responsive">

            <table className="table table-bordered table-hover align-middle">

              <thead className="table-light">

                <tr>
                  <th>#</th>
                  <th>Event</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Status</th>
                </tr>

              </thead>

              <tbody>

                <tr>
                  <td>1</td>
                  <td>Tech Fest</td>
                  <td>20/06/2026</td>
                  <td>22/06/2026</td>
                  <td>
                    <span className="badge bg-warning">
                      Pending
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>2</td>
                  <td>Hackathon</td>
                  <td>10/06/2026</td>
                  <td>12/06/2026</td>
                  <td>
                    <span className="badge bg-success">
                      Approved
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>3</td>
                  <td>Workshop</td>
                  <td>01/06/2026</td>
                  <td>02/06/2026</td>
                  <td>
                    <span className="badge bg-danger">
                      Rejected
                    </span>
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>

      {/* Quick Action */}
      <div className="mt-4">
        <button className="btn btn-primary">
          Apply New Leave
        </button>
      </div>

    </DashboardLayout>
  );
}

export default StudentDashboard;