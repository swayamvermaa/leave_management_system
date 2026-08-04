import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import OrganizerLeaveTable from "../components/OrganizerLeaveTable";
import {
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa"; 
import {
  getOrganizerLeaves,
  getOrganizerStats,
} from "../api/organizerApi";
import Loader from "../components/Loader";

function OrganizerDashboard() {
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

  // temporary fetchLeaves function for debugging
  const fetchLeaves = async () => {
  try {
    const response = await getOrganizerLeaves();

    setLeaves(response.data.data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  const fetchStats = async () => {
    try {
      const response = await getOrganizerStats();

      setStats({
        pending: response.data.pending,
        approved: response.data.approved,
        rejected: response.data.rejected,
      });

    } catch (error) {
      console.log(error);
    }
  };

if (loading) {
  return <Loader />;
}

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

              <h3>{stats.pending}</h3>

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

              <h3>{stats.approved}</h3>

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

              <h3>{stats.rejected}</h3>

              <p className="mb-0">
                Rejected
              </p>

            </div>
          </div>
        </div>

      </div>

    {loading ? (
      <Loader />
) : (
  <OrganizerLeaveTable
    leaves={leaves}
    fetchLeaves={fetchLeaves}
    fetchStats={fetchStats}
  />
)}

    </DashboardLayout>
  );
  
}

export default OrganizerDashboard;