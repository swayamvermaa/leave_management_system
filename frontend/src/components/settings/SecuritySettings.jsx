import { useState } from "react";
import {
  FaShieldAlt,
  FaLock,
  FaCheckCircle,
  FaMobileAlt,
  FaLaptop,
  FaSignOutAlt,
  FaTrashAlt,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

function SecuritySettings() {
  const [twoFA, setTwoFA] = useState(false);

  return (
    <div className="security-settings">

      <h4 className="settings-title">
        Security Settings
      </h4>

      {/* Security Score */}

      <div className="security-card">

        <div className="d-flex justify-content-between align-items-center mb-3">

          <h5>
            <FaShieldAlt className="me-2 text-primary" />
            Security Score
          </h5>

          <span className="badge bg-success">
            Excellent
          </span>

        </div>

        <div className="progress security-progress">

          <div
            className="progress-bar bg-success"
            style={{ width: "90%" }}
          >
            90%
          </div>

        </div>

        <small className="text-muted">
          Your account is well protected.
        </small>

      </div>

      {/* Account Status */}

      <div className="security-card">

        <h5 className="mb-4">
          <FaLock className="me-2 text-primary" />
          Account Status
        </h5>

        <div className="security-item">

          <div>

            <strong>Password</strong>

            <p>Strong Password</p>

          </div>

          <FaCheckCircle
            className="text-success"
            size={22}
          />

        </div>

        <div className="security-item">

          <div>

            <strong>Email Verification</strong>

            <p>Email Verified</p>

          </div>

          <FaCheckCircle
            className="text-success"
            size={22}
          />

        </div>

      </div>

      {/* Two Factor */}

      <div className="security-card">

        <div className="security-item">

          <div>

            <strong>Two Factor Authentication</strong>

            <p>Add extra protection to your account.</p>

          </div>

          <label className="switch">

            <input
              type="checkbox"
              checked={twoFA}
              onChange={() =>
                setTwoFA(!twoFA)
              }
            />

            <span className="slider"></span>

          </label>

        </div>

      </div>

      {/* Active Devices */}

      <div className="security-card">

        <h5 className="mb-4">
          <FaLaptop className="me-2 text-primary" />
          Active Devices
        </h5>

        <div className="device-item">

          <div className="device-icon">

            <FaLaptop />

          </div>

          <div>

            <strong>Windows 11</strong>

            <p>Chrome • Current Device</p>

          </div>

        </div>

        <div className="device-item">

          <div className="device-icon">

            <FaMobileAlt />

          </div>

          <div>

            <strong>Android</strong>

            <p>Chrome Mobile • Yesterday</p>

          </div>

        </div>

      </div>

      {/* Login History */}

      <div className="security-card">

        <h5 className="mb-4">
          <FaClock className="me-2 text-primary" />
          Recent Login Activity
        </h5>

        <div className="login-item">

          <FaMapMarkerAlt className="text-danger me-2" />

          Agra, India • Today

        </div>

        <div className="login-item">

          <FaMapMarkerAlt className="text-danger me-2" />

          Noida, India • Yesterday

        </div>

      </div>

      {/* Logout */}

      <div className="security-card">

        <button className="btn btn-danger security-btn">

          <FaSignOutAlt className="me-2" />

          Logout From All Devices

        </button>

      </div>

      {/* Danger Zone */}

      <div className="danger-card">

        <h5>

          <FaTrashAlt className="me-2" />

          Danger Zone

        </h5>

        <p>
          Permanently delete your account.
        </p>

        <button
          className="btn btn-outline-danger"
          disabled
        >
          Delete Account
        </button>

      </div>

    </div>
  );
}

export default SecuritySettings;