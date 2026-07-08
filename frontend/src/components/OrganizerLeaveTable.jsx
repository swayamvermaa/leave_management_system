function OrganizerLeaveTable() {
  const requests = [
    {
      id: 1,
      student: "Swayam Verma",
      enrollment: "2215001800",
      event: "Tech Fest",
      from: "20/06/2026",
      to: "22/06/2026",
      status: "Pending",
    },
    {
      id: 2,
      student: "Rahul Sharma",
      enrollment: "2215001801",
      event: "Hackathon",
      from: "10/06/2026",
      to: "12/06/2026",
      status: "Pending",
    },
  ];

  return (
    <div className="card shadow-sm border-0 mt-4">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Pending Leave Requests</h5>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Student</th>
              <th>Enrollment</th>
              <th>Event</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
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
                <td>{leave.from}</td>
                <td>{leave.to}</td>
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
  );
}

export default OrganizerLeaveTable;