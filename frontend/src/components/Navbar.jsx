import { useEffect, useState } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  getUpcomingEvents,
  getLatestEvents,
} from "../api/eventApi";

// const user = JSON.parse(localStorage.getItem("user")); 

function Navbar() {

  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [upcomingEvents, setUpcomingEvents] =
    useState([]);

  const [latestEvents, setLatestEvents] =
    useState([]);

  useEffect(() => {

    fetchNotifications();

  }, []);

  const fetchNotifications = async () => {

    try {

      const [upcomingResponse, latestResponse] =
        await Promise.all([
          getUpcomingEvents(),
          getLatestEvents(),
        ]);

      setUpcomingEvents(
        upcomingResponse.data.data || []
      );

      setLatestEvents(
        latestResponse.data.data || []
      );

    } catch (error) {

      console.log(
        "Notification Error:",
        error
      );

    }

  };

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");

  };

  const formatDate = (date) => {

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  };

  
  
  const getDaysRemaining = (startDate) => {
    const today = new Date();
    const start = new Date(startDate);
    
    today.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    
    const difference =
    start.getTime() - today.getTime();
    
    return Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );
  };
  
  const notificationCount =
    upcomingEvents.length;


  return (

    <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4">

      <div className="container-fluid">

        {/* Left Side */}

        <h4 className="fw-bold text-primary mb-0">

          Campus Duty Leave Management

        </h4>


        {/* Right Side */}

        <div className="d-flex align-items-center">


          {/* Notification */}

          <div className="position-relative me-3">

            <button
              className="btn btn-light position-relative"
              onClick={() =>
                setShowNotifications(
                  !showNotifications
                )
              }
            >

              <FaBell size={20} />

              {notificationCount > 0 && (

                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                >
                  {notificationCount}
                </span>

              )}

            </button>


            {/* Notification Dropdown */}

            {showNotifications && (

              <div
                className="position-absolute bg-white shadow-lg rounded-3 p-3"
                style={{
                  width: "380px",
                  right: 0,
                  top: "45px",
                  zIndex: 1050,
                  maxHeight: "500px",
                  overflowY: "auto",
                }}
              >

                <div className="d-flex justify-content-between align-items-center mb-3">

                  <h5 className="fw-bold mb-0">
                    Notifications
                  </h5>

                  <span className="badge bg-primary">
                    {notificationCount}
                  </span>

                </div>


                {/* Upcoming Events */}

                <h6 className="text-primary fw-bold">
                  Upcoming Events
                </h6>


                {upcomingEvents.length === 0 ? (

                  <p className="text-muted small">
                    No upcoming events.
                  </p>

                ) : (

                  upcomingEvents.map((event) => (

                    <div
                      key={event._id}
                      className="border rounded-3 p-3 mb-2"
                    >

                      <div className="fw-bold">
                        {event.eventName}
                      </div>

                      <div className="small text-muted mt-1">
                        📅 {formatDate(event.startDate)} - {formatDate(event.endDate)}
                      </div>

                      <div className="small text-muted">
                        📍 {event.venue || "Venue not specified"}
                      </div>

                      <div className="small text-muted">
                        👤 {event.organizer?.name || "Organizer"}
                      </div>

                      <div className="small text-muted">
                        🎓 {event.course} - Year {event.year} - Section {event.section}
                      </div>

                      <div className="mt-2">

                          {getDaysRemaining(event.startDate) === 0 ? (

                            <span className="badge bg-danger">
                              Starts Today
                            </span>

                          ) : (

                            <span className="badge bg-success">
                              {getDaysRemaining(event.startDate)} days remaining
                            </span>

                          )}

                        </div>

                    </div>

                  ))

                )}


                {/* Latest Events */}

                <hr />

                <h6 className="text-success fw-bold">
                  Latest Events
                </h6>


                {latestEvents.length === 0 ? (

                  <p className="text-muted small">
                    No events found.
                  </p>

                ) : (

                  latestEvents.slice(0, 5).map((event) => (

                    <div
                      key={event._id}
                      className="border-bottom py-2"
                    >

                      <div className="fw-semibold">
                        {event.eventName}
                      </div>

                      <div className="small text-muted">

                        Created{" "}
                        {formatDate(
                          event.createdAt
                        )}

                      </div>

                    </div>

                  ))

                )}

              </div>

            )}

          </div>


          {/* User Info */}

          <div
              className="d-flex align-items-center me-3"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/profile")}
              title="View Profile"
            >
              <FaUserCircle
                size={35}
                className="text-primary me-2"
              />

              <div>
                <h6 className="mb-0">
                  {user?.name}
                </h6>

                <small className="text-muted text-capitalize">
                  {user?.role}
                </small>
              </div>
            </div>


          {/* Logout */}

          <button
            className="btn btn-danger btn-sm"
            onClick={handleLogout}
          >

            Logout

          </button>

        </div>

      </div>

    </nav>

  );

}

export default Navbar;