import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import {
  getMentorLeaves,
  getMentorStats,
} from "../api/mentorApi";
import MentorLeaveTable from "../components/MentorLeaveTable";

function MentorDashboard() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
  pending: 0,
  approved: 0,
  rejected: 0,
});
useEffect(() => {
  fetchLeaves();
  fetchStats();
}, []);

  const fetchLeaves = async () => {
    try {
      const response = await getMentorLeaves();
      setLeaves(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }; 

  const fetchStats = async () => {
  try {
    const response = await getMentorStats();

    setStats({
      pending: response.data.pending,
      approved: response.data.approved,
      rejected: response.data.rejected,
    });

  } catch (error) {
    console.log(error);
  }
};

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
              <h3>{stats.pending}</h3>
              <p>Pending</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <FaCheckCircle className="fs-1 text-success mb-3" />
              <h3>{stats.approved}</h3>
              <p>Approved</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <FaTimesCircle className="fs-1 text-danger mb-3" />
              <h3>{stats.rejected}</h3>
              <p>Rejected</p>
            </div>
          </div>
        </div>

      </div>

      {/* Table */}

      {loading ? (
          <div className="text-center mt-5">
            <h5>Loading...</h5>
          </div>
        ) : (
          <MentorLeaveTable
            leaves={leaves}
            fetchLeaves={fetchLeaves}
            fetchStats={fetchStats}
          />
        )}
    </DashboardLayout>
  );
}

export default MentorDashboard;