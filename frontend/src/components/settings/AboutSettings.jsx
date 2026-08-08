import {
  FaUniversity,
  FaCode,
  FaLaptopCode,
  FaEnvelope,
  FaGithub,
  FaGlobe,
  FaCheckCircle,
  FaInfoCircle,
  FaUserGraduate,
} from "react-icons/fa";

function AboutSettings() {

  const features = [
    "Campus Duty Leave Approval",
    "Event Management",
    "Real-time Notifications",
    "Role Based Dashboards",
    "Email Verification",
    "Secure Authentication",
    "Responsive Design",
    "Future Attendance Integration",
  ];

  return (

    <div className="about-settings">

      {/* Header */}

      <div className="about-header">

        <div className="about-logo">

          <FaUniversity />

        </div>

        <h2>Campus Duty Leave Management System</h2>

        <span className="about-version">
          Version 1.0.0
        </span>

      </div>

      {/* About */}

      <div className="about-card">

        <h4>

          <FaInfoCircle className="me-2" />

          About CDLMS

        </h4>

        <p>

          Campus Duty Leave Management System (CDLMS)
          is a centralized platform designed to simplify
          campus duty leave management between Students,
          Organizers, Mentors, HODs and Administrators.

        </p>

        <p>

          It provides a complete workflow for
          leave requests, approvals, event
          management, notifications and secure
          authentication.

        </p>

      </div>

      {/* Features */}

      <div className="about-card">

        <h4>

          <FaCheckCircle className="me-2" />

          Features

        </h4>

        <div className="feature-grid">

          {features.map((item,index)=>(

            <div
              key={index}
              className="feature-item"
            >

              <FaCheckCircle />

              <span>{item}</span>

            </div>

          ))}

        </div>

      </div>

      {/* Tech */}

      <div className="about-card">

        <h4>

          <FaLaptopCode className="me-2" />

          Technology Stack

        </h4>

        <div className="tech-grid">

          <div>

            <h6>Frontend</h6>

            <ul>

              <li>React.js</li>

              <li>Bootstrap</li>

              <li>Axios</li>

              <li>React Router</li>

            </ul>

          </div>

          <div>

            <h6>Backend</h6>

            <ul>

              <li>Node.js</li>

              <li>Express.js</li>

              <li>MongoDB</li>

              <li>JWT Authentication</li>

              <li>Nodemailer</li>

              <li>Cloudinary</li>

            </ul>

          </div>

        </div>

      </div>

      {/* Developer */}

      <div className="about-card">

        <h4>

          <FaCode className="me-2" />

          Developer

        </h4>

        <div className="developer-box">

          <FaUserGraduate
            size={55}
            className="developer-icon"
          />

          <div>

            <h5>Swayam Verma</h5>

            <p>B.Tech Computer Science</p>

            <p>Sharda University</p>

          </div>

        </div>

      </div>

      {/* Contact */}

      <div className="about-card">

        <h4>

          <FaEnvelope className="me-2" />

          Contact

        </h4>

        <div className="contact-item">

          <FaEnvelope />

          <span>vermaswayam225@gmail.com</span>
          <span>CUSTOMER SUPPORT</span>

        </div>

        <div className="contact-item">

          <FaGithub />

          <span>GitHub (Coming Soon)</span>

        </div>

        <div className="contact-item">

          <FaGlobe />

          <span>www.cdlms.com</span>

        </div>

      </div>

      {/* Footer */}

      <div className="about-footer">

        © 2026 CDLMS

        <br />

        All Rights Reserved

      </div>

    </div>

  );

}

export default AboutSettings;