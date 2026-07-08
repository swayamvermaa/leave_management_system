import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserGraduate } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!formData.email || !formData.password) {
//       toast.error("Please fill all fields");
//       return;
//     }

//     // toast.success("Frontend Login Successful");
//     toast.success("Login Successful");

//     setTimeout(() => {
//     navigate("/student-dashboard");
//     }, 1000);

//   };

    const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
        toast.error("Please fill all fields");
        return;
    }

    toast.success("Login Successful");

    setTimeout(() => {
        switch (formData.role) {
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

        default:
            navigate("/");
        }
    }, 1000);
    };


  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">

      <ToastContainer />

      <div className="card shadow-lg p-4" style={{ width: "420px" }}>

        <div className="text-center mb-4">
          <FaUserGraduate size={70} className="text-primary" />
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

          <div className="mb-4">

            <label>Login As</label>

            <select
              className="form-select"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="student">Student</option>
              <option value="organizer">Organizer</option>
              <option value="mentor">Mentor</option>
              <option value="hod">HOD</option>
            </select>

          </div>

          <button className="btn btn-primary w-100">
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;