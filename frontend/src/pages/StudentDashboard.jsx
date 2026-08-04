import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../api/axios";
import { getStudentEvents } from "../api/eventApi";
import Loader from "../components/Loader";

import {
  FaFileAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

function StudentDashboard() {
  const navigate = useNavigate();

  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaves = async () => {
    try {
      const res = await API.get("/leave/my-leaves");

      setLeaves(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const total = leaves.length;

  const pending = leaves.filter(
    (leave) => leave.finalStatus === "Pending"
  ).length;

  const approved = leaves.filter(
    (leave) => leave.finalStatus === "Approved"
  ).length;

  const rejected = leaves.filter(
    (leave) => leave.finalStatus === "Rejected"
  ).length;

  useEffect(() => {
  loadEvents();
}, []);

const loadEvents = async () => {
  try {
    const res = await getStudentEvents();

    console.log("Student Events =>", res.data);

  } catch (error) {
    console.log(error);
  }
};

if (loading) {
  return <Loader />;
}

  return (
    
    <DashboardLayout>
      
      <div className="mb-4">
        <h2 className="fw-bold">Student Dashboard</h2>
        <p className="text-muted">
          Welcome to the Campus Duty Leave Management System.
        </p>
      </div>

      <div className="row g-4">

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <FaFileAlt className="text-primary fs-1 mb-3"/>
              <h3>
                {total}
              </h3>
              <p>Total Leaves</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <FaClock className="text-primary fs-1 mb-3"/>
              <h3>{pending}</h3>
              <p>Pending</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <FaCheckCircle className="text-primary fs-1 mb-3"/>
              <h3>{approved}</h3>
              <p>Approved</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <FaTimesCircle className="text-primary fs-1 mb-3" />
              <h3>{rejected}</h3>
              <p>Rejected</p>
            </div>
          </div>
        </div>

      </div>

      <div className="card shadow-sm mt-5 border-0 rounded-4">

        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">
            Recent Leave Requests
          </h5>
        </div>

        <div className="card-body">

          {/* {loading ? (
            <h5 className="text-center">Loading...</h5>
          ) : ( */}
            <div className="table-responsive"
              style={{
                overflowX: "auto",
                WebkitOverflowScrolling: "touch",
              }} 
            >

              <table className="table table-bordered table-hover align-middle"
                style={{
                  minWidth: "700px",
                }}
              >

                <thead>
                  <tr>
                    <th>#</th>
                    <th>Event</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {leaves.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No Leave Applications Found
                      </td>
                    </tr>
                  ) : (
                    leaves.map((leave, index) => (
                      <tr key={leave._id}>

                        <td>{index + 1}</td>

                        <td>{leave.eventName}</td>

                        <td>
                          {new Date(
                            leave.fromDate
                          ).toLocaleDateString()}
                        </td>

                        <td>
                          {new Date(
                            leave.toDate
                          ).toLocaleDateString()}
                        </td>

                        <td>

                          <span
                              className={`badge px-3 py-2 ${
                              leave.finalStatus === "Approved"
                                ? "bg-success"
                                : leave.finalStatus === "Rejected"
                                ? "bg-danger"
                                : "bg-warning text-dark"
                            }`}
                          >
                            {leave.finalStatus}
                          </span>

                        </td>

                      </tr>
                    ))
                  )}

                </tbody>

              </table>

            </div>
          

        </div>

      </div>

      <div className="mt-4">
        <button
          className="btn btn-primary"
          style={{
          width:
          window.innerWidth < 576
          ? "100%"
          : "auto",
          }}
          onClick={() => navigate("/apply-leave")}
        >
          Apply New Leave
        </button>
      </div>
    </DashboardLayout>
  );
}


export default StudentDashboard;