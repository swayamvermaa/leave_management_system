import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../api/axios";
import { toast } from "react-toastify";

function LeaveHistory() {
  const [search, setSearch] = useState("");
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  
  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await API.get("/leave/my-leaves");

      setLeaveData(response.data.data);

    } catch (error) {
      toast.error("Failed to fetch leave history");
    } finally {
      setLoading(false);
    }
  };

  const filteredLeaves = leaveData.filter((leave) => {
    const matchesSearch = leave.eventName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || leave.finalStatus === statusFilter;

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

          {loading && <p>Loading...</p>}
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
                    <tr key={leave._id.slice(-6)}>
                      <td>{leave._id.slice(-6)}</td>
                      <td>{leave.eventName}</td>
                      <td>{new Date(leave.fromDate).toLocaleDateString()}</td>
                      <td>{new Date(leave.toDate).toLocaleDateString()}</td>

                      <td style={{ minWidth: "250px" }}>

                        <div className="mb-2">

                          <strong>Organizer :</strong>

                          <span
                            className={`badge ms-2 bg-${getBadge(
                              leave.organizerStatus
                            )}`}
                          >
                            {leave.organizerStatus}
                          </span>

                        </div>

                        {leave.organizerRemark && (
                          <small className="text-muted d-block mb-2">
                            <strong>Remark:</strong>{" "}
                            {leave.organizerRemark}
                          </small>
                        )}

                        <div className="mb-2">

                          <strong>Mentor :</strong>

                          <span
                            className={`badge ms-2 bg-${getBadge(
                              leave.mentorStatus
                            )}`}
                          >
                            {leave.mentorStatus}
                          </span>

                        </div>

                        {leave.mentorRemark && (
                          <small className="text-muted d-block mb-2">
                            <strong>Remark:</strong>{" "}
                            {leave.mentorRemark}
                          </small>
                        )}

                        <div className="mb-2">

                          <strong>HOD :</strong>

                          <span
                            className={`badge ms-2 bg-${getBadge(
                              leave.hodStatus
                            )}`}
                          >
                            {leave.hodStatus}
                          </span>

                        </div>

                        {leave.hodRemark && (
                          <small className="text-muted d-block mb-2">
                            <strong>Remark:</strong>{" "}
                            {leave.hodRemark}
                          </small>
                        )}

                        <hr />

                        <div>

                          <strong>Final :</strong>

                          <span
                            className={`badge ms-2 bg-${getBadge(
                              leave.finalStatus
                            )}`}
                          >
                            {leave.finalStatus}
                          </span>

                        </div>

                      </td>

                      <td>
                          {leave.proof ? (
                            <a
                              href={leave.proof}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-sm btn-primary"
                            >
                              View
                            </a>
                          ) : (
                            <span className="text-muted">
                              Not Uploaded
                            </span>
                          )}
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