import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getDashboardStats } from "../api/adminApi";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBuilding,
  FaUsers,
  FaClipboardList,
} from "react-icons/fa";

function AdminDashboard() {
  const [stats, setStats] = useState({
    students: 0,
    mentors: 0,
    organizers: 0,
    hods: 0,
    leaves: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await getDashboardStats();
      setStats(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <h2 className="fw-bold">Admin Dashboard</h2>

      <p className="text-muted">
        Campus Duty Leave Management Overview
      </p>

      <div className="row g-4 mt-2">

        <div className="col-md-4">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <FaUserGraduate className="fs-1 text-primary mb-3" />
              <h3>{stats.students}</h3>
              <p>Students</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <FaChalkboardTeacher className="fs-1 text-success mb-3" />
              <h3>{stats.mentors}</h3>
              <p>Mentors</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <FaBuilding className="fs-1 text-danger mb-3" />
              <h3>{stats.hods}</h3>
              <p>HODs</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <FaUsers className="fs-1 text-warning mb-3" />
              <h3>{stats.organizers}</h3>
              <p>Organizers</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <FaClipboardList className="fs-1 text-info mb-3" />
              <h3>{stats.leaves}</h3>
              <p>Total Leaves</p>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;