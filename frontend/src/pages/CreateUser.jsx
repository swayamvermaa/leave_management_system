import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { createUser } from "../api/adminApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  COURSES,
  YEARS,
  SEMESTERS,
  SECTIONS,
} from "../constants/collegeData";
import Loader from "../components/Loader";

function CreateUser() {
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "student",

    enrollmentNumber: "",

    course: "",
    department: "",
    year: 1,
    semester: 1,
    section: "",

    mentorCourse: "",
    mentorDepartment: "",
    mentorYear: 1,
    mentorSemester: 1,
    mentorSection: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.phone || formData.phone.length !== 10) {
    toast.error("Phone number must be exactly 10 digits");
    return;
  }

  if (
    formData.role === "student" &&
    formData.enrollmentNumber.length !== 10
  ) {
    toast.error("Enrollment number must be exactly 10 digits");
    return;
  }

  if (formData.password.length < 6) {
  toast.error("Password must be at least 6 characters");
  return;
}
if (!formData.name.trim()) {
  toast.error("Name is required");
  return;
}
if (!formData.email.trim()) {
  toast.error("Email is required");
  return;
}

    try {
      setCreating(true);
      // console.log("Creating Started");
      // await new Promise(resolve => setTimeout(resolve, 2000));
      const response = await createUser(formData);

      toast.success(response.data.message);

      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",

        role: "student",

        enrollmentNumber: "",

        course: "",
        department: "",
        year: 1,
        semester: 1,
        section: "",

        mentorCourse: "",
        mentorDepartment: "",
        mentorYear: 1,
        mentorSemester: 1,
        mentorSection: "",
      });

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create user"
      );
    } finally {
    setCreating(false);
  }
  };

  // if (creating) {
  //   return <Loader />;
  //   // setCreating(false);
  // }

  return (
    <DashboardLayout>

       {creating && <Loader />}

      <ToastContainer />

      <h2 className="fw-bold mb-4">
        Create User
      </h2>

      <div className="card shadow p-4">

        <form onSubmit={handleSubmit}>

          <div className="row">

            {/* Name */}

            <div className="col-md-6 mb-3">
              <label>Name</label>

              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}

            <div className="col-md-6 mb-3">
              <label>Email</label>

              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone Number */}

              <div className="col-md-6 mb-3">
                <label>Phone Number</label>

                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  placeholder="Enter 10 digit phone number"
                  maxLength={10}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");

                    setFormData({
                      ...formData,
                      phone: value,
                    });
                  }}
                />

                {formData.phone.length > 0 &&
                  formData.phone.length !== 10 && (
                    <small className="text-danger">
                      Phone number must be exactly 10 digits
                    </small>
                  )}
              </div>

            {/* Password */}

            <div className="col-md-6 mb-3">
              <label>Password</label>

              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Role */}

            <div className="col-md-6 mb-3">
              <label>Role</label>

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

            {/* Enrollment */}

            {formData.role === "student" && (

              <div className="col-md-6 mb-3">
                <label>Enrollment Number</label>

                <input
                  type="text"
                  className="form-control"
                  maxLength={10}
                  name="enrollmentNumber"
                  value={formData.enrollmentNumber}
                  onChange={(e) => {

                    const value = e.target.value.replace(/\D/g, "");

                    setFormData({
                      ...formData,
                      enrollmentNumber: value,
                    });

                  }}
                />

              </div>

            )}

            {/* Student Course */}

            {(formData.role === "student" ||
               formData.role === "hod") && (

              <div className="col-md-6 mb-3">

                <label>Course</label>

                <select
                  className="form-select"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                >
                  <option value="">Select Course</option>
                  {COURSES.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>

              </div>

            )}

            {/* Mentor Course */}

            {formData.role === "mentor" && (

              <div className="col-md-6 mb-3">

                <label>Mentor Course</label>

                <select
                  className="form-select"
                  name="mentorCourse"
                  value={formData.mentorCourse}
                  onChange={handleChange}
                >
                    <option value="">Select Course</option>

                    {COURSES.map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}

                </select>

              </div>

            )}

            {/* Student Year */}

            {formData.role === "student" && (

              <div className="col-md-6 mb-3">

                <label>Year</label>

                <select
                  className="form-select"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                >
                  {YEARS.map((year) => (
                  <option key={year} value={year}>
                    {year} Year
                  </option>
                ))}
                </select>

              </div>

            )}

            {/* Mentor Year */}

            {formData.role === "mentor" && (

              <div className="col-md-6 mb-3">

                <label>Mentor Year</label>

                <select
                  className="form-select"
                  name="mentorYear"
                  value={formData.mentorYear}
                  onChange={handleChange}
                >
                  <option value={1}>1st Year</option>
                  <option value={2}>2nd Year</option>
                  <option value={3}>3rd Year</option>
                  <option value={4}>4th Year</option>
                </select>

              </div>

            )}

            {/* Student Department */}

            {(formData.role === "student" ||
                formData.role === "hod")&& (

              <div className="col-md-6 mb-3">

                <label>Department</label>

                <select
                  className="form-select"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                >

                  <option value="">Select Department</option>

                  <option value="CSE">CSE</option>
                  <option value="CS">CS</option>
                  <option value="IT">IT</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="ME">Mechanical</option>
                  <option value="CE">Civil</option>

                </select>

              </div>

            )}

            {/* Mentor Department */}

            {formData.role === "mentor" && (

              <div className="col-md-6 mb-3">

                <label>Mentor Department</label>

                <select
                  className="form-select"
                  name="mentorDepartment"
                  value={formData.mentorDepartment}
                  onChange={handleChange}
                >

                  <option value="">Select Department</option>

                  <option value="CSE">CSE</option>
                  <option value="CS">CS</option>
                  <option value="IT">IT</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="ME">Mechanical</option>
                  <option value="CE">Civil</option>

                </select>

              </div>

            )}

            {/* Student Semester */}

            {formData.role === "student" && (

              <div className="col-md-6 mb-3">

                <label>Semester</label>

                <select
                  className="form-select"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                >
                  {SEMESTERS.map((semester) => (
                  <option key={semester} value={semester}>
                    Semester {semester}
                  </option>
                ))}
                </select>

              </div>

            )}

            {/* Mentor Section */}

            {formData.role === "mentor" && (

              <div className="col-md-6 mb-3">

                <label>Section</label>

                <select
                  className="form-select"
                  name="mentorSection"
                  value={formData.mentorSection}
                  onChange={handleChange}
                >
                    <option value="">Select Section</option>
                  {SECTIONS.map((section) => (
                    <option key={section} value={section}>
                      {section}
                    </option>
                  ))}

                </select>

              </div>

            )}

            {/* Student Section */}

            {formData.role === "student" && (

              <div className="col-md-6 mb-3">

                <label>Section</label>

                <select
                  className="form-select"
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                >
                <option value="">Select Section</option>
                {SECTIONS.map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
                </select>

              </div>

            )}

          </div>

          <button className="btn btn-primary"
            disabled={creating}>
            {creating ? "Creating..." : "Create User"}
          </button>

        </form>

      </div>

    </DashboardLayout>
  );
}

export default CreateUser;