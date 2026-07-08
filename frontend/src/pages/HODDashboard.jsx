import DashboardLayout from "../layouts/DashboardLayout";
import {
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

function HODDashboard() {
  const requests = [
    {
      id: 1,
      student: "Swayam Verma",
      enrollment: "2215001800",
      department: "Computer Science",
      event: "Tech Fest",
      mentorStatus: "Approved",
      status: "Pending",
    },
    {
      id: 2,
      student: "Rahul Sharma",
      enrollment: "2215001801",
      department: "Computer Science",
      event: "Hackathon",
      mentorStatus: "Approved",
      status: "Pending",
    },
  ];

  return (
    <DashboardLayout>
      <h2 className="fw-bold">HOD Dashboard</h2>

      <p className="text-muted">
        Final approval of duty leave applications.
      </p>

      {/* Statistics */}
      <div className="row g-4 mt-2">

        <div className="col-md-4">
          <div className="card shadow border-0 h-100">
            <div className="card-body text-center">
              <FaClock className="fs-1 text-warning mb-3" />
              <h3>6</h3>
              <p className="mb-0">Pending</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <FaCheckCircle className="fs-1 text-success mb-3" />
              <h3>30</h3>
              <p className="mb-0">Approved</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <FaTimesCircle className="fs-1 text-danger mb-3" />
              <h3>2</h3>
              <p className="mb-0">Rejected</p>
            </div>
          </div>
        </div>

      </div>

      {/* Leave Requests Table */}
      <div className="card shadow-sm mt-4 border-0">

        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Mentor Approved Requests</h5>
        </div>

        <div className="table-responsive">

          <table className="table table-bordered table-hover mb-0">

            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Student</th>
                <th>Enrollment</th>
                <th>Department</th>
                <th>Event</th>
                <th>Mentor Status</th>
                <th>Remarks</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {requests.map((leave) => (
                <tr key={leave.id}>

                  <td>{leave.id}</td>
                  <td>{leave.student}</td>
                  <td>{leave.enrollment}</td>
                  <td>{leave.department}</td>
                  <td>{leave.event}</td>

                  <td>
                    <span className="badge bg-success">
                      {leave.mentorStatus}
                    </span>
                  </td>

                  <td style={{ minWidth: "220px" }}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter remarks"
                    />
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

export default HODDashboard;