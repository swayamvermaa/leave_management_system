import DashboardLayout from "../layouts/DashboardLayout";
import {
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

function MentorDashboard() {
  const requests = [
    {
      id: 1,
      student: "Swayam Verma",
      enrollment: "2215001800",
      event: "Tech Fest",
      from: "20/06/2026",
      to: "22/06/2026",
      organizerStatus: "Approved",
      status: "Pending",
    },
    {
      id: 2,
      student: "Rahul Sharma",
      enrollment: "2215001801",
      event: "Hackathon",
      from: "10/06/2026",
      to: "12/06/2026",
      organizerStatus: "Approved",
      status: "Pending",
    },
  ];

  return (
    <DashboardLayout>

      <h2 className="fw-bold">Mentor Dashboard</h2>

      <p className="text-muted">
        Review organizer approved leave requests.
      </p>

      {/* Statistics Cards */}

      <div className="row g-4 mt-2">

        <div className="col-md-4">
          <div className="card shadow border-0 h-100">
            <div className="card-body text-center">
              <FaClock className="fs-1 text-warning mb-3" />
              <h3>10</h3>
              <p>Pending</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <FaCheckCircle className="fs-1 text-success mb-3" />
              <h3>35</h3>
              <p>Approved</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <FaTimesCircle className="fs-1 text-danger mb-3" />
              <h3>3</h3>
              <p>Rejected</p>
            </div>
          </div>
        </div>

      </div>

      {/* Table */}

      <div className="card shadow-sm mt-4 border-0">

        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">
            Organizer Approved Requests
          </h5>
        </div>

        <div className="table-responsive">

          <table className="table table-bordered table-hover mb-0">

            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Student</th>
                <th>Enrollment</th>
                <th>Event</th>
                <th>Organizer</th>
                <th>Mentor</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {requests.map((leave) => (

                <tr key={leave.id}>

                  <td>{leave.id}</td>

                  <td>{leave.student}</td>

                  <td>{leave.enrollment}</td>

                  <td>{leave.event}</td>

                  <td>
                    <span className="badge bg-success">
                      {leave.organizerStatus}
                    </span>
                  </td>

                  <td>
                    <span className="badge bg-warning">
                      {leave.status}
                    </span>
                  </td>

                  <td>

                    <button className="btn btn-success btn-sm me-2">
                      Approve
                    </button>

                    <button className="btn btn-danger btn-sm">
                      Reject
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default MentorDashboard;