// function LeaveHistory() {
//   return <h2>Leave History Page</h2>;
// }

// export default LeaveHistory;
// import DashboardLayout from "../layouts/DashboardLayout";

// function LeaveHistory() {
//   return (
//     <DashboardLayout>
//       <h2>Leave History</h2>
//     </DashboardLayout>
//   );
// }

// export default LeaveHistory;

import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

function LeaveHistory() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const leaveData = [
    {
      id: 1,
      event: "Tech Fest",
      from: "20/06/2026",
      to: "22/06/2026",
      status: "Pending",
      proof: "proof1.pdf",
    },
    {
      id: 2,
      event: "Hackathon",
      from: "10/06/2026",
      to: "12/06/2026",
      status: "Approved",
      proof: "proof2.pdf",
    },
    {
      id: 3,
      event: "Workshop",
      from: "01/06/2026",
      to: "02/06/2026",
      status: "Rejected",
      proof: "proof3.pdf",
    },
  ];

  const filteredLeaves = leaveData.filter((leave) => {
    const matchesSearch = leave.event
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || leave.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getBadge = (status) => {
    switch (status) {
      case "Approved":
        return "success";
      case "Rejected":
        return "danger";
      default:
        return "warning";
    }
  };

  return (
    <DashboardLayout>
      <div className="card shadow border-0">

        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Leave History</h4>
        </div>

        <div className="card-body">

          {/* Search & Filter */}
          <div className="row mb-4">

            <div className="col-md-6 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Event Name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="col-md-3 mb-2">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>All</option>
                <option>Pending</option>
                <option>Approved</option>
                <option>Rejected</option>
              </select>
            </div>

          </div>

          {/* Table */}
          <div className="table-responsive">

            <table className="table table-bordered table-hover align-middle">

              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Event</th>
                  <th>Leave From</th>
                  <th>Leave To</th>
                  <th>Status</th>
                  <th>Proof</th>
                </tr>
              </thead>

              <tbody>

                {filteredLeaves.length > 0 ? (
                  filteredLeaves.map((leave) => (
                    <tr key={leave.id}>
                      <td>{leave.id}</td>
                      <td>{leave.event}</td>
                      <td>{leave.from}</td>
                      <td>{leave.to}</td>

                      <td>
                        <span
                          className={`badge bg-${getBadge(
                            leave.status
                          )}`}
                        >
                          {leave.status}
                        </span>
                      </td>

                      <td>
                        <button className="btn btn-sm btn-outline-primary">
                          View Proof
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center text-muted"
                    >
                      No Leave Records Found
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default LeaveHistory;