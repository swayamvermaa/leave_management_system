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
import Loader from "../components/Loader";

function AdminDashboard() {
  const [loading, setLoading] = useState(true);
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
      setLoading(true);
      const response = await getDashboardStats();
      setStats(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
    setLoading(false);
  }
  };

if (loading) {
  return <Loader />;
}

  return (
    <DashboardLayout>
      <h2 
        className="fw-bold"
        style={{
          fontSize:
            window.innerWidth < 576
              ? "24px"
              : window.innerWidth < 992
              ? "28px"
              : "34px",
        }}
      >Admin Dashboard</h2>

      <p 
        className="text-muted"
        style={{
          fontSize:
            window.innerWidth < 576
              ? "14px"
              : "16px",
        }}
      >
        Campus Duty Leave Management Overview
      </p>

      <div className="row g-3 mt-2">

        <div className="col-12 col-sm-6 col-xl-4">
          <div className="card shadow border-0 rounded-4 h-100">
            <div className="card-body text-center"
              style={{
                padding:
                  window.innerWidth < 576
                    ? "20px"
                    : window.innerWidth < 992
                    ? "24px"
                    : "32px",
              }}
            >
              <FaUserGraduate 
              style={{
  fontSize:
    window.innerWidth < 576
      ? "38px"
      : window.innerWidth < 992
      ? "44px"
      : "52px",
}}
className="text-primary mb-3"
              />
              <h3
                style={{
    fontSize:
      window.innerWidth < 576
        ? "28px"
        : window.innerWidth < 992
        ? "32px"
        : "36px",
  }}
              
              >{stats.students}</h3>
              <p>Students</p>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-4">
          <div className="card shadow border-0 rounded-4 h-100">
            <div className="card-body text-center"
              style={{
                padding:
                  window.innerWidth < 576
                    ? "20px"
                    : window.innerWidth < 992
                    ? "24px"
                    : "32px",
              }}
            >
              <FaChalkboardTeacher style={{
  fontSize:
    window.innerWidth < 576
      ? "38px"
      : window.innerWidth < 992
      ? "44px"
      : "52px",
}}
className="text-primary mb-3"/>
              <h3>{stats.mentors}</h3>
              <p>Mentors</p>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-4">
          <div className="card shadow border-0 rounded-4 h-100">
            <div className="card-body text-center"
              style={{
                padding:
                  window.innerWidth < 576
                    ? "20px"
                    : window.innerWidth < 992
                    ? "24px"
                    : "32px",
              }}
            >
              <FaBuilding style={{
  fontSize:
    window.innerWidth < 576
      ? "38px"
      : window.innerWidth < 992
      ? "44px"
      : "52px",
}}
className="text-primary mb-3" />
              <h3>{stats.hods}</h3>
              <p>HODs</p>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-4">
          <div className="card shadow border-0 rounded-4 h-100">
            <div className="card-body text-center"
              style={{
                padding:
                  window.innerWidth < 576
                    ? "20px"
                    : window.innerWidth < 992
                    ? "24px"
                    : "32px",
              }}
            >
              <FaUsers style={{
  fontSize:
    window.innerWidth < 576
      ? "38px"
      : window.innerWidth < 992
      ? "44px"
      : "52px",
}}
className="text-primary mb-3" />
              <h3>{stats.organizers}</h3>
              <p>Organizers</p>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-4">
          <div className="card shadow border-0 rounded-4 h-100">
            <div className="card-body text-center"
              style={{
                padding:
                  window.innerWidth < 576
                    ? "20px"
                    : window.innerWidth < 992
                    ? "24px"
                    : "32px",
              }}
            >
              <FaClipboardList style={{
  fontSize:
    window.innerWidth < 576
      ? "38px"
      : window.innerWidth < 992
      ? "44px"
      : "52px",
}}
className="text-primary mb-3" />
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