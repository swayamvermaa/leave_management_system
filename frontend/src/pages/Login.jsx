import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUserGraduate } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import API from "../api/axios";
import { firebaseLogin } from "../api/authApi";
import { Modal } from "react-bootstrap";
import Loader from "../components/Loader";

function Login() {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(300);
  const [canResend, setCanResend] = useState(false);

  const [loading, setLoading] = useState(false);      // Login Loader
  const [otpLoading, setOtpLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showForgot, setShowForgot] = useState(false);
    const [forgotData, setForgotData] = useState({
      email: "",
      otp: "",
      password: "",
    });
    const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  if (!formData.email || !formData.password) {
    toast.error("Please fill all fields");
    return;
  }

  try {

    // ==========================================
    // 1. CHECK PENDING REGISTRATION
    // ==========================================

    const pendingRegistration =
      localStorage.getItem("pendingRegistration");

    // ==========================================
    // 2. NEW STUDENT
    // ==========================================

    if (pendingRegistration) {

      const registrationData =
        JSON.parse(pendingRegistration);

      // Check same email
      if (
        registrationData.email.toLowerCase() ===
        formData.email.toLowerCase()
      ) {

        // --------------------------------------
        // Firebase Login
        // --------------------------------------

        const firebaseUser = await firebaseLogin(
          formData.email,
          formData.password
        );

        // --------------------------------------
        // Email verification
        // --------------------------------------

        if (!firebaseUser.emailVerified) {

          toast.error(
            "Please verify your email before login."
          );

          return;
        }

        // --------------------------------------
        // Register in MongoDB
        // --------------------------------------

        try {

          await API.post(
            "/auth/register",
            registrationData
          );

          localStorage.removeItem(
            "pendingRegistration"
          );

        } catch (registerError) {

          // If already exists, continue
          if (
            registerError.response?.status === 409
          ) {

            localStorage.removeItem(
              "pendingRegistration"
            );

          } else {

            throw registerError;

          }
        }
      }
    }

    // ==========================================
    // 3. BACKEND LOGIN
    // ==========================================

    const response = await API.post(
      "/auth/login",
      {
        email: formData.email,
        password: formData.password,
      }
    );

    // ==========================================
    // 4. SAVE JWT
    // ==========================================

    localStorage.setItem(
      "token",
      response.data.token
    );

    // ==========================================
    // 5. SAVE USER
    // ==========================================

    localStorage.setItem(
      "user",
      JSON.stringify(response.data.data)
    );

    // ==========================================
    // 6. SUCCESS
    // ==========================================

    toast.success("Login successful");

    // ==========================================
    // 7. ROLE REDIRECTION
    // ==========================================

    setTimeout(() => {

      switch (response.data.data.role) {

        case "student":
          navigate("/student-dashboard");
          break;

        case "organizer":
          navigate("/organizer-dashboard");
          break;

        case "mentor":
          navigate("/mentor-dashboard");
          break;

        case "hod":
          navigate("/hod-dashboard");
          break;

        case "admin":
          navigate("/admin-dashboard");
          break;

        default:
          navigate("/");
      }

    }, 1000);

  } catch (error) {

    console.error("Login Error:", error);

    toast.error(
      error.response?.data?.message ||
      error.message ||
      "Login Failed"
    );
  } finally {
    setLoading(false);
  }
};

const sendOTP = async () => {
  try {
    setOtpLoading(false);
    await API.post("/auth/forgot-password", {
      email: forgotData.email,
    });

    toast.success("OTP sent successfully");
    
    setOtpSent(true);
    setTimer(200); // 5 minutes
    setCanResend(false);

  } catch (err) {

    toast.error(
      err.response?.data?.message ||
      "Failed to send OTP"
    );

  }
  finally {

    setOtpLoading(false);

    }
};

const resetPassword = async () => {
  if (!forgotData.otp) {
    toast.error("Enter OTP");
    return;
  }

  if (!forgotData.password) {
    toast.error("Enter new password");
    return;
  }
  try {

    await API.post("/auth/reset-password", {
      email: forgotData.email,
      otp: forgotData.otp,
      password: forgotData.password,
    });

    toast.success("Password changed successfully");

    setShowForgot(false);

    setOtpSent(false);

    setForgotData({
      email: "",
      otp: "",
      password: "",
    });

  } catch (err) {

    toast.error(
      err.response?.data?.message ||
      "Failed"
    );

  }
};
useEffect(() => {
  let interval;

  if (otpSent && timer > 0) {
    interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
  }

  if (timer === 0) {
    setCanResend(true);
    clearInterval(interval);
  }

  return () => clearInterval(interval);
}, [otpSent, timer]);

if (loading) {
  return <Loader />;
}

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">

      <ToastContainer />

      <div
        className="card shadow-lg p-4"
        style={{ width: "420px" }}
      >

        <div className="text-center mb-4">

          <FaUserGraduate
            size={70}
            className="text-primary"
          />

          <h3 className="mt-3">
            Campus Duty Leave Management
          </h3>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">

            <label>Email</label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

          </div>

          <div className="mb-3">

            <label>Password</label>

             <div className="position-relative">

    <input
      type={showPassword ? "text" : "password"}
      className="form-control"
      style={{ paddingRight: "50px" }}
      placeholder="Enter Password"
      name="password"
      value={formData.password}
      onChange={handleChange}
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      style={{
        position: "absolute",
        right: "12px",
        top: "50%",
        transform: "translateY(-50%)",
        border: "none",
        background: "transparent",
        padding: 0,
        fontSize: "20px",
        cursor: "pointer",
        zIndex: 5,
      }}
    >
      {showPassword ? "🙈" : "👁"}
    </button>

  </div>

          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        <div className="text-end mt-2">
        <button
          type="button"
          className="btn btn-link p-0"
          onClick={() => setShowForgot(true)}
        >
          Forgot Password?
        </button>
      </div>

          <div className="text-center mt-3">

            <p className="mb-0">
              Don't have an account?{" "}
              <Link to="/signup">
                Student Registration
              </Link>
            </p>

          </div>

        </form>

      </div>
      <Modal
        show={showForgot}
        onHide={() => {
          setShowForgot(false);
          setOtpSent(false);
        }}
        centered
      >

        <Modal.Header closeButton>

          <Modal.Title>
            Forgot Password
          </Modal.Title>

        </Modal.Header>

        <Modal.Body>

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter Email"
            value={forgotData.email}
            onChange={(e) =>
              setForgotData({
                ...forgotData,
                email: e.target.value,
              })
            }
          />

          {!otpSent ? (
            <button
              className="btn btn-primary w-100"
              onClick={sendOTP}
              disabled={loading}
              >
              {loading ? "Sending..." : "Send OTP"}
              </button>

          ) : (

            <>

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter OTP"
                value={forgotData.otp}
                onChange={(e) =>
                  setForgotData({
                    ...forgotData,
                    otp: e.target.value,
                  })
                }
              />

              <div className="text-center mb-3">

                    {!canResend ? (

                      <small className="text-danger">
                        OTP expires in{" "}
                        {Math.floor(timer / 60)}:
                        {(timer % 60).toString().padStart(2, "0")}
                      </small>

                    ) : (

                      <button
                        className="btn btn-link"
                        onClick={sendOTP}
                      >
                        Resend OTP
                      </button>

                    )}

                  </div>

              <input
                type="password"
                className="form-control mb-3"
                placeholder="New Password"
                value={forgotData.password}
                onChange={(e) =>
                  setForgotData({
                    ...forgotData,
                    password: e.target.value,
                  })
                }
              />
              <button
                className="btn btn-success w-100"
                onClick={resetPassword}
              >
                Reset Password
              </button>

            </>

          )}

        </Modal.Body>

      </Modal>

    </div>
  );
}

export default Login;