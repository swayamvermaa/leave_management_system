import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUserGraduate } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import API from "../api/axios";
import { firebaseLogin } from "../api/authApi";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

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
  }
};

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

            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Login
          </button>

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

    </div>
  );
}

export default Login;