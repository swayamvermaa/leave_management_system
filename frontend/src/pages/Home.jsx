import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaCheckCircle,
  FaCalendarCheck,
  FaUserShield,
  FaClipboardCheck,
  FaChartLine,
} from "react-icons/fa";

import "../styles/home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">

      {/* ================= NAVBAR ================= */}

      <nav className="home-navbar">

        <div
          className="home-brand"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="brand-mark">C</div>

          <div className="brand-text">
            <strong>CDLMS</strong>
            <span>Campus Duty Leave Management</span>
          </div>
        </div>

        <div className="home-nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#workflow">How It Works</a>
          <a href="#about">About</a>
        </div>

        <div className="home-nav-actions">

          <button
            className="nav-login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="nav-register-btn"
            onClick={() => navigate("/signup")}
          >
            Register
          </button>

        </div>

      </nav>


      {/* ================= HERO ================= */}

      <main id="home" className="home-hero">

        <div className="hero-background-glow glow-one"></div>
        <div className="hero-background-glow glow-two"></div>

        <div className="hero-content">

          <div className="hero-badge">
            <span></span>
            Smart Campus Management Platform
          </div>

          <h1>
            Manage Campus Leaves
            <br />

            <span>Smarter. Faster. Better.</span>
          </h1>

          <p>
            A powerful digital platform for students, mentors,
            organizers and HODs to manage duty leave applications,
            approvals and campus events in one place.
          </p>

          <div className="hero-actions">

            <button
              className="hero-primary-btn"
              onClick={() => navigate("/login")}
            >
              Login
              <FaArrowRight />
            </button>

            <button
              className="hero-secondary-btn"
              onClick={() => navigate("/signup")}
            >
              Register as Student
            </button>

          </div>

          <div className="hero-trust">

            <div>
              <FaCheckCircle />
              Secure
            </div>

            <div>
              <FaCheckCircle />
              Fast approvals
            </div>

            <div>
              <FaCheckCircle />
              Easy tracking
            </div>

          </div>

        </div>


        {/* ================= DASHBOARD PREVIEW ================= */}

        <div className="hero-dashboard">

          <div className="dashboard-window">

            <div className="window-top">

              <div className="window-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <span className="window-title">
                CDLMS Dashboard
              </span>

            </div>


            <div className="dashboard-body">

              <div className="dashboard-heading">
                <div>
                  <small>Overview</small>
                  <h3>Good morning 👋</h3>
                </div>

                <div className="dashboard-avatar">
                  S
                </div>
              </div>


              <div className="dashboard-stats">

                <div className="mini-stat">
                  <span className="stat-icon blue">
                    <FaCalendarCheck />
                  </span>

                  <div>
                    <small>Total Leaves</small>
                    <strong>24</strong>
                  </div>
                </div>

                <div className="mini-stat">
                  <span className="stat-icon green">
                    <FaClipboardCheck />
                  </span>

                  <div>
                    <small>Approved</small>
                    <strong>18</strong>
                  </div>
                </div>

                <div className="mini-stat">
                  <span className="stat-icon purple">
                    <FaChartLine />
                  </span>

                  <div>
                    <small>Events</small>
                    <strong>12</strong>
                  </div>
                </div>

              </div>


              <div className="approval-card">

                <div className="approval-header">
                  <div>
                    <small>Recent Application</small>
                    <strong>Duty Leave Request</strong>
                  </div>

                  <span className="approved-badge">
                    Approved
                  </span>
                </div>

                <div className="approval-progress">

                  <div className="progress-step completed">
                    <span>✓</span>
                    <small>Applied</small>
                  </div>

                  <div className="progress-line active"></div>

                  <div className="progress-step completed">
                    <span>✓</span>
                    <small>Mentor</small>
                  </div>

                  <div className="progress-line active"></div>

                  <div className="progress-step completed">
                    <span>✓</span>
                    <small>HOD</small>
                  </div>

                </div>

              </div>


              <div className="dashboard-bottom">

                <div className="activity-card">
                  <small>Upcoming Event</small>
                  <strong>Tech Fest 2026</strong>
                  <span>Tomorrow · 10:00 AM</span>
                </div>

                <div className="activity-card">
                  <small>Leave Balance</small>
                  <strong>08 Days</strong>
                  <span>Available</span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </main>


      {/* ================= FEATURES ================= */}

      <section id="features" className="features-section">

        <div className="section-heading">

          <span>POWERFUL FEATURES</span>

          <h2>
            Everything you need to manage
            <br />
            campus duty leaves.
          </h2>

          <p>
            Designed to simplify the entire leave management
            process for students and administrators.
          </p>

        </div>


        <div className="features-grid">

          <div className="feature-card">
            <div className="feature-icon blue">
              <FaCalendarCheck />
            </div>

            <h3>Easy Leave Applications</h3>

            <p>
              Submit duty leave applications digitally
              without paperwork or unnecessary delays.
            </p>
          </div>


          <div className="feature-card">
            <div className="feature-icon purple">
              <FaUserShield />
            </div>

            <h3>Smart Approval System</h3>

            <p>
              Mentor and HOD approvals are organized
              into a simple and transparent workflow.
            </p>
          </div>


          <div className="feature-card">
            <div className="feature-icon green">
              <FaChartLine />
            </div>

            <h3>Track Everything</h3>

            <p>
              Track applications, approval status,
              history and events from one dashboard.
            </p>
          </div>

        </div>

      </section>


      {/* ================= WORKFLOW ================= */}

      <section id="workflow" className="workflow-section">

        <div className="workflow-content">

          <span>HOW IT WORKS</span>

          <h2>
            From application to approval,
            <br />
            everything stays organized.
          </h2>

          <p>
            CDLMS connects students, mentors and HODs
            through a streamlined digital approval process.
          </p>

        </div>


        <div className="workflow-steps">

          <div className="workflow-step">
            <div>01</div>
            <h3>Apply</h3>
            <p>Student submits a duty leave application.</p>
          </div>

          <div className="workflow-step">
            <div>02</div>
            <h3>Review</h3>
            <p>Mentor reviews and processes the request.</p>
          </div>

          <div className="workflow-step">
            <div>03</div>
            <h3>Approve</h3>
            <p>HOD gives the final approval.</p>
          </div>

          <div className="workflow-step">
            <div>04</div>
            <h3>Track</h3>
            <p>Student can track the complete status.</p>
          </div>

        </div>

      </section>


      {/* ================= ABOUT ================= */}

      <section id="about" className="about-section">

        <div className="about-card">

          <div>
            <span>BUILT FOR CAMPUS</span>

            <h2>
              One platform.
              <br />
              Every approval.
            </h2>
          </div>

          <p>
            CDLMS brings students, mentors, organizers and
            HODs together into one secure and easy-to-use
            campus management ecosystem.
          </p>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="home-cta">

        <div>

          <span>READY TO GET STARTED?</span>

          <h2>
            Make campus leave management
            <br />
            simple and digital.
          </h2>

        </div>

        <button
          onClick={() => navigate("/signup")}
        >
          Register as Student
          <FaArrowRight />
        </button>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="home-footer">

        <div className="footer-brand">

          <div className="brand-mark">C</div>

          <div>
            <strong>CDLMS</strong>
            <span>Campus Duty Leave Management System</span>
          </div>

        </div>

        <p>
          © 2026 CDLMS. All rights reserved.
        </p>

      </footer>

    </div>
  );
}

export default Home;