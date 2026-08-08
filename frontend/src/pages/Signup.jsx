import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import API from "../api/axios";
import { firebaseSignup } from "../api/authApi";
import Loader from "../components/Loader";


function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordStrength, setPasswordStrength] = useState("");

  const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",

  role: "student",

  enrollmentNumber: "",

  course: "",

  department: "",

  year: "",

  semester: "",

  section: "",

  mentorYear: "",

  mentorSection: "",
});

const checkPasswordStrength = (password) => {
  if (password.length < 6) return "Weak";

  if (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  ) {
    return "Strong";
  }

  return "Medium";
};


const handleChange = (e) => {

  const { name, value } = e.target;

  setFormData({

    ...formData,

    [name]: value,

  });

  if (name === "password") {

    setPasswordStrength(
      checkPasswordStrength(value)
    );

  }

};

const handleSubmit = async (e) => {
  e.preventDefault();

    toast.error("TEST TOAST");

  if (
    !formData.name ||
    !formData.email ||
    !formData.password ||
    !formData.confirmPassword
  ) {
    toast.error("Please fill all required fields");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  try {
    setLoading(true);

    // ==========================================
    // 1. CREATE ACCOUNT IN FIREBASE
    // ==========================================

    await firebaseSignup(
      formData.email,
      formData.password
    );

    // ==========================================
    // 2. SAVE REGISTRATION DATA TEMPORARILY
    // ==========================================

    const registrationData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,

      phone: formData.phone,

      enrollmentNumber: formData.enrollmentNumber,

      course: formData.course,
      department: formData.department,
      year: formData.year,
      semester: formData.semester,
      section: formData.section,

      mentorYear: formData.mentorYear,
      mentorSection: formData.mentorSection,
    };

    localStorage.setItem(
      "pendingRegistration",
      JSON.stringify(registrationData)
    );

    // ==========================================
    // 3. SHOW SUCCESS
    // ==========================================
    console.log("FIREBASE SIGNUP SUCCESS");

    toast.success(
      "Account created! Please verify your email (open Gmail -> Spam), then login.",
        {
          position: "top-right",
          autoClose: 5000,
        }
    );

    // console.log("TOAST CALLED");

    // ==========================================
    // 4. GO TO LOGIN
    // ==========================================

    setTimeout(() => {
      navigate("/");
    }, 6000);

  } catch (error) {
    // console.error("Signup Error:", error);
    // console.error("ERROR CODE:", error?.code);
    // console.error("ERROR MESSAGE:", error?.message);


    toast.error(
      error.code === "auth/email-already-in-use"
        ? "This email is already registered in Firebase."
        : error.message || "Registration failed",
            {
      position: "top-right",
      autoClose: 5000,
    }
        
    );

  } finally {
    setLoading(false);
  }
};

if (loading) {
  return <Loader />;
}

  return (
    <div className="container py-5">

      <div className="card border-0 shadow-lg rounded-4">

        <div
          className="card-header text-center text-white py-4"
          style={{ 
          background:"linear-gradient(135deg,#2563EB,#1D4ED8)"
          }}
          >
          <h2 className="fw-bold mb-2">

            Student Registration

            </h2>

            <p className="mb-0">

            Campus Duty Leave Management System

            </p>
        </div>

        <div className="card-body p-5">

          <form onSubmit={handleSubmit}>

          <div className="d-flex align-items-center mb-4">

                <div
                    className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center"
                    style={{
                        width: "45px",
                        height: "45px",
                        fontSize: "20px",
                    }}
                >
                    👤
                </div>

                <div className="ms-3">

                    <h3 className="mb-0 text-primary fw-bold">

                        Personal Details

                    </h3>

                    <small className="text-muted">

                        Enter your basic information

                    </small>

                </div>

            </div>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                Name
                </label>
                <input
                  className="form-control rounded-3 py-2"
                  name="name"
                  value={formData.name}
                  placeholder="Enter Full Name"
                  onChange={handleChange}
                />
              </div>

               <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Email</label>

                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    

              <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Phone Number</label>

                  <input
                    type="tel"
                    className="form-control rounded-3 py-2"
                    name="phone"
                    value={formData.phone}
                    placeholder="+91"
                    onChange={handleChange}
                    maxLength={10}
                  />
                </div>  


                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Enrollment Number</label>
                  <input
                    className="form-control rounded-3 py-2"
                    name="enrollmentNumber"
                    value={formData.enrollmentNumber}
                    placeholder="Enrollment Number"
                    onChange={handleChange}
                  />
                </div>
                <div className="row">
                  <div
                    className="p-4 rounded-4"
                    style={{
                    background:"#F8FAFC",
                    border:"1px solid #E2E8F0"
                    }}
                    ></div>
                </div>

              {/* ================= EMAIL VERIFICATION ================= */}

  
              {/* ================= password ================= */}

                <hr className="my-4"/>
                <div className="d-flex align-items-center mb-4">

                    <div
                      className="bg-danger text-white rounded-circle d-flex justify-content-center align-items-center"
                      style={{
                        width: "45px",
                        height: "45px",
                        fontSize: "20px",
                      }}
                    >
                      🔒
                    </div>

                    <div className="ms-3">

                      <h3 className="mb-0 text-danger fw-bold">
                        Security
                      </h3>

                      <small className="text-muted">
                        Create a strong password
                      </small>

                    </div>

                  </div>
                  <div className="row">

  {/* Password */}
  <div className="col-md-6 mb-3">
    <label className="form-label fw-semibold">
      Password
    </label>

  <div className="position-relative">
  <input
    type={showPassword ? "text" : "password"}
    className="form-control rounded-3 py-2"
    style={{ paddingRight: "50px" }}
    name="password"
    value={formData.password}
    onChange={handleChange}
    placeholder="Enter Password"
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

    <small className="text-muted">
      Password should contain at least 8 characters.
    </small>

    {/* Password strength yahin rahega */}
    {formData.password && (
      <div className="mt-2">
        {passwordStrength === "Weak" && (
          <span className="text-danger fw-bold">
            Weak Password
          </span>
        )}

        {passwordStrength === "Medium" && (
          <span className="text-warning fw-bold">
            Medium Password
          </span>
        )}

        {passwordStrength === "Strong" && (
          <span className="text-success fw-bold">
            Strong Password
          </span>
        )}
      </div>
    )}
  </div>


  {/* Confirm Password */}
  <div className="col-md-6 mb-3">

    <label className="form-label fw-semibold">
      Confirm Password
    </label>

    <div className="position-relative">
  <input
    type={showConfirmPassword ? "text" : "password"}
    className="form-control rounded-3 py-2"
    style={{ paddingRight: "50px" }}
    name="confirmPassword"
    value={formData.confirmPassword}
    onChange={handleChange}
    placeholder="Confirm Password"
  />

  <button
    type="button"
    onClick={() =>
      setShowConfirmPassword(!showConfirmPassword)
    }
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
    {showConfirmPassword ? "🙈" : "👁"}
  </button>
</div>

    {formData.confirmPassword && (
      formData.password === formData.confirmPassword ? (
        <p className="text-success mt-2">
          ✅ Password Matched
        </p>
      ) : (
        <p className="text-danger mt-2">
          ❌ Password Doesn't Match
        </p>
      )
    )}
  </div>
</div>
              {formData.role === "student" && (
                <>
                {/* -------------------------- Academic Details------------------------------------- */}

                <hr className="my-4"/>

                  <div className="d-flex align-items-center mb-4">

                    <div
                        className="bg-success text-white rounded-circle d-flex justify-content-center align-items-center"
                        style={{
                            width: "45px",
                            height: "45px",
                            fontSize: "20px",
                        }}
                    >
                        🎓
                    </div>

                    <div className="ms-3">

                        <h3 className="mb-0 text-success fw-bold">

                            Academic Details

                        </h3>

                        <small className="text-muted">

                            Select your academic information

                        </small>

                    </div>

                </div>

                <div
                    className="p-4 rounded-4 mb-4"
                    style={{
                    background:"#F8FAFC",
                    border:"1px solid #E2E8F0"
                    }}
                    ></div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Course</label>
                <select
                    className="form-select rounded-3 py-2"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    >
                    <option value="">Choose Course</option>
                    <option value="B.Tech">B.Tech</option>
                    <option value="BCA">BCA</option>
                    <option value="MCA">MCA</option>
                    <option value="MBA">MBA</option>
                    <option value="BBA">BBA</option>
                    </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Department</label>
                    <select
                        className="form-select rounded-3 py-2"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        >
                        <option value="">Choose Department</option>
                        <option value="CSE">Computer Science</option>
                        <option value="IT">Information Technology</option>
                        <option value="ECE">Electronics</option>
                        <option value="EE">Electrical</option>
                        <option value="ME">Mechanical</option>
                        <option value="CE">Civil</option>
                        </select>
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label fw-semibold">Year</label>
                <select
                  className="form-select rounded-3 py-2"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                >
                  <option value="">Choose Year</option>
                  <option value="1">1st</option>
                  <option value="2">2nd</option>
                  <option value="3">3rd</option>
                  <option value="4">4th</option>
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label fw-semibold">Semester</label>
                <select
                  className="form-select rounded-3 py-2"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                >
                  <option value="">Choose Semester</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label fw-semibold">Section</label>
                    <select
                        className="form-select rounded-3 py-2"  
                        name="section"
                        value={formData.section}
                        onChange={handleChange}
                        >
                        <option value="">Choose Section</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        </select>
              </div>
              </>
            )}

                        {formData.role === "mentor" && (
              <>
                <div className="col-md-6 mb-3">
                  <label >Course</label>

                  <select
                    className="form-select rounded-3 py-2"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                  >
                    <option value="">Select Course</option>
                    <option value="B.Tech">B.Tech</option>
                    <option value="BCA">BCA</option>
                    <option value="MCA">MCA</option>
                    <option value="MBA">MBA</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label>Department</label>

                  <select
                    className="form-select"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                  >
                    <option value="">Select Department</option>
                    <option value="CSE">Computer Science</option>
                    <option value="IT">Information Technology</option>
                    <option value="ECE">Electronics</option>
                    <option value="ME">Mechanical</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label>Mentor Year</label>

                  <select
                    className="form-select"
                    name="mentorYear"
                    value={formData.mentorYear}
                    onChange={handleChange}
                  >
                    <option value="">Select Year</option>
                    <option value="1">1st</option>
                    <option value="2">2nd</option>
                    <option value="3">3rd</option>
                    <option value="4">4th</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label>Mentor Section</label>

                  <select
                    className="form-select"
                    name="mentorSection"
                    value={formData.mentorSection}
                    onChange={handleChange}
                  >
                    <option value="">Select Section</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>
              </>
            )}
                    {formData.role === "hod" && (
          <>
            <div className="col-md-6 mb-3">
              <label>Department</label>

              <select
                className="form-select"
                name="department"
                value={formData.department}
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                <option value="CSE">Computer Science</option>
                <option value="IT">Information Technology</option>
                <option value="ECE">Electronics</option>
                <option value="ME">Mechanical</option>
              </select>
            </div>
          </>
        )}

            </div>

            <button
  type="submit"
  className="btn btn-primary w-100"
  disabled={loading}
>
  {loading ? "Creating Account..." : "Register"}
</button>

          </form>
          <div className="text-center mt-3">
            Already have an account?{" "}
            <Link to="/">Login</Link>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Signup;