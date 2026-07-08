import DashboardLayout from "../layouts/DashboardLayout";
import OrganizerLeaveTable from "../components/OrganizerLeaveTable";
import {
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

function OrganizerDashboard() {
  return (
    <DashboardLayout>

      <h2 className="fw-bold">
        Organizer Dashboard
      </h2>

      <p className="text-muted">
        Manage student duty leave requests.
      </p>

      <div className="row g-4 mt-2">

        <div className="col-md-4">
          <div className="card shadow border-0 h-100">
            <div className="card-body text-center">

              <FaClock className="fs-1 text-warning mb-3"/>

              <h3>18</h3>

              <p className="mb-0">
                Pending Requests
              </p>

            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">

              <FaCheckCircle className="fs-1 text-success mb-3"/>

              <h3>40</h3>

              <p className="mb-0">
                Approved
              </p>

            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">

              <FaTimesCircle className="fs-1 text-danger mb-3"/>

              <h3>5</h3>

              <p className="mb-0">
                Rejected
              </p>

            </div>
          </div>
        </div>

      </div>

      <OrganizerLeaveTable />

    </DashboardLayout>
  );
}

export default OrganizerDashboard;