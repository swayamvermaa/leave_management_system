import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getAllUsers, updateUser, deleteUser  } from "../api/adminApi";
import {
  COURSES,
  YEARS,
  SEMESTERS,
  SECTIONS,
} from "../constants/collegeData";

function ManageUsers() {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [editingUser, setEditingUser] = useState(null);
  const [studentSearch, setStudentSearch] = useState("");

  const [mentorSearch, setMentorSearch] = useState("");

  const [organizerSearch, setOrganizerSearch] = useState("");

  const [hodSearch, setHodSearch] = useState("");

  const [formData, setFormData] = useState({
      // Common
      name: "",
      email: "",
      phone: "",
      role: "",

      // Student
      enrollmentNumber: "",
      course: "",
      department: "",
      year: "",
      semester: "",
      section: "",

      // Mentor
      mentorCourse: "",
      mentorDepartment: "",
      mentorYear: "",
      mentorSection: "",

      // HOD
      isHOD: false,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {

    try {

      const response = await getAllUsers();

      setUsers(response.data.data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleEdit = (user) => {

      setEditingUser(user);

      setFormData({

        // Common
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "",

        // Student
        enrollmentNumber: user.enrollmentNumber || "",
        course: user.course || "",
        department: user.department || "",
        year: user.year || "",
        semester: user.semester || "",
        section: user.section || "",

        // Mentor
        mentorCourse: user.mentorCourse || "",
        mentorDepartment: user.mentorDepartment || "",
        mentorYear: user.mentorYear || "",
        mentorSection: user.mentorSection || "",

        // HOD
        isHOD: user.isHOD || false,

      });

      setShowModal(true);
    };

    const handleUpdate = async () => {
    try {
      await updateUser(editingUser._id, formData);

      fetchUsers();

      setShowModal(false);

    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id, name) => {

  const confirmDelete = window.confirm(
    `Are you sure you want to delete ${name}?`
  );

  if (!confirmDelete) return;

  try {

    await deleteUser(id);

    alert("User Deleted Successfully");

    fetchUsers();

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Delete Failed"
    );

  }

};

  const filteredUsers = users.filter((user) => {
  return (
    user.name?.toLowerCase().includes(search.toLowerCase()) ||
    user.email?.toLowerCase().includes(search.toLowerCase()) ||
    user.enrollmentNumber?.toLowerCase().includes(search.toLowerCase()) ||
    user.phone?.toLowerCase().includes(search.toLowerCase())
  );
});

const visibleUsers = users.filter(
  (user) => user.role !== "admin"
);

const students = visibleUsers.filter((user) => {

  if (user.role !== "student") return false;

  return (

    user.name?.toLowerCase().includes(studentSearch.toLowerCase()) ||

    user.email?.toLowerCase().includes(studentSearch.toLowerCase()) ||

    user.phone?.includes(studentSearch) ||

    user.enrollmentNumber?.toLowerCase().includes(studentSearch.toLowerCase())

  );

});

const mentors = visibleUsers.filter((user) => {

  if (user.role !== "mentor") return false;

  return (

    user.name?.toLowerCase().includes(mentorSearch.toLowerCase()) ||

    user.email?.toLowerCase().includes(mentorSearch.toLowerCase()) ||

    user.phone?.includes(mentorSearch)

  );

});

const organizers = visibleUsers.filter((user) => {

  if (user.role !== "organizer") return false;

  return (

    user.name?.toLowerCase().includes(organizerSearch.toLowerCase()) ||

    user.email?.toLowerCase().includes(organizerSearch.toLowerCase()) ||

    user.phone?.includes(organizerSearch)

  );

});

const hods = visibleUsers.filter((user) => {

  if (user.role !== "hod") return false;

  return (

    user.name?.toLowerCase().includes(hodSearch.toLowerCase()) ||

    user.email?.toLowerCase().includes(hodSearch.toLowerCase()) ||

    user.phone?.includes(hodSearch)

  );

});

  return (

    <DashboardLayout>

      <h2
        className="fw-bold mb-3"
        style={{
          fontSize:
            window.innerWidth < 576
              ? "24px"
              : window.innerWidth < 992
              ? "28px"
              : "32px",
        }}
      >
        Manage Users
      </h2>

      <div className="row mt-4">
        </div>
        <h3 className="mt-4 text-primary">
        📘 Students
        </h3>
        <div className="row mb-3">

            <div className="col-12 col-md-6 col-lg-5">

              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search by Name / Enrollment / Phone / Email"
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
              />

            </div>

          </div>

      <div className="card shadow mt-4 rounded-4">

        <div className="table-responsive">

          <table className="table table-bordered table-hover align-middle text-nowrap">

            <thead className="table-dark">

              <tr>


                  <th>Name</th>

                  <th>Enrollment</th>

                  <th>Course</th>

                  <th>Department</th>

                  <th>Year</th>

                  <th>Semester</th>

                  <th>Section</th>

                  <th>Phone</th>

                  <th>Email</th>

                  <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {students.map((user) => (

                <tr key={user._id}>

                <td>{user.name}</td>

                  <td>{user.enrollmentNumber}</td>

                  <td>{user.course}</td>

                  <td>{user.department}</td>

                  <td>{user.year}</td>

                  <td>{user.semester}</td>

                  <td>{user.section}</td>

                  <td>{user.phone}</td>

                  <td>{user.email}</td>
                  <td
                    className="d-flex flex-column flex-lg-row gap-2"
                    style={{
                      minWidth: "150px",
                    }}
                  >
                  <button
                    className="btn btn-warning btn-sm w-100 w-lg-auto"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm w-100 w-lg-auto"
                    onClick={() =>
                    handleDelete(user._id, user.name)
                    }
                  >
                    Delete
                  </button>
                </td>

                </tr>

              ))}

            </tbody>

          </table>


        </div>

      </div>
              <h3 className="mt-5 text-success">
              👨‍🏫 Mentors
              </h3>
              <div className="card shadow mt-3">

          <div className="row mb-3">

          <div className="col-12 col-md-6 col-lg-5">

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search by Name / Phone / Email"
              value={mentorSearch}
              onChange={(e) => setMentorSearch(e.target.value)}
            />

          </div>

        </div>


  <div className="card shadow mt-3 rounded-4">
    <div className="table-responsive">

    <table className="table table-bordered table-hover align-middle text-nowrap">

      <thead className="table-success">

        <tr>

          <th>Name</th>

          <th>Course</th>

          <th>Year</th>

          <th>Section</th>

          <th>Phone</th>

          <th>Email</th>

          <th>Actions</th>

        </tr>

      </thead>

      <tbody>

        {mentors.map((user) => (

          <tr key={user._id}>

            <td>{user.name}</td>

            <td>{user.mentorCourse}</td>

            <td>{user.mentorYear}</td>

            <td>{user.mentorSection}</td>

            <td>{user.phone}</td>

            <td>{user.email}</td>

            <td
            className="d-flex flex-column flex-lg-row gap-2"
              style={{
                minWidth: "150px",
              }}
            >

              <button
                className="btn-warning btn-sm w-100 w-lg-auto"
                onClick={() => handleEdit(user)}
              >
                Edit
              </button>

              <button
                className="btn btn-danger btn-sm w-100 w-lg-auto"
                onClick={() =>
                handleDelete(user._id, user.name)
                }
              >
                Delete
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>
</div>

<h3 className="mt-5 text-warning">
📋 Organizers
</h3>
<div className="row mb-3">

  <div className="col-12 col-md-6 col-lg-5">

    <input
      type="text"
      className="form-control form-control-lg"
      placeholder="Search by Name / Phone / Email"
      value={organizerSearch}
      onChange={(e) => setOrganizerSearch(e.target.value)}
    />

  </div>

</div>

<div className="card shadow mt-3 rounded-4">

  <div className="table-responsive">

    <table className="table table-bordered table-hover align-middle text-nowrap">

      <thead className="table-warning">

        <tr>

          <th>Name</th>
          <th>Course</th>
          <th>Department</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Actions</th>

        </tr>

      </thead>

      <tbody>

        {organizers.map((user) => (

          <tr key={user._id}>

            <td>{user.name}</td>
            <td>{user.course}</td>
            <td>{user.department}</td>
            <td>{user.phone}</td>
            <td>{user.email}</td>

            <td
              className="d-flex flex-column flex-lg-row gap-2"
              style={{
                minWidth: "150px",
              }}>

              <button
                className="btn btn-warning btn-sm w-100 w-lg-auto"
                onClick={() => handleEdit(user)}
              >
                Edit
              </button>

              <button
                className="btn btn-danger btn-sm w-100 w-lg-auto"
                onClick={() =>
                  handleDelete(user._id, user.name)
                  }
              >
                Delete
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>

<h3 className="mt-5 text-danger">
🎓 HOD
</h3>
<div className="row mb-3">

  <div className="col-12 col-md-6 col-lg-5">

    <input
      type="text"
      className="form-control form-control-lg"
      placeholder="Search by Name / Phone / Email"
      value={hodSearch}
      onChange={(e) => setHodSearch(e.target.value)}
    />

  </div>

</div>

<div className="card shadow mt-3 rounded-4">

  <div className="table-responsive">

    <table className="table table-bordered table-hover align-middle text-nowrap">

      <thead className="table-danger">

        <tr>

          <th>Name</th>
          <th>Course</th>
          <th>Department</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Actions</th>

        </tr>

      </thead>

      <tbody>

        {hods.map((user) => (

          <tr key={user._id}>

            <td>{user.name}</td>
            <td>{user.course}</td>
            <td>{user.department}</td>
            <td>{user.phone}</td>
            <td>{user.email}</td>

            <td
              className="d-flex flex-column flex-lg-row gap-2"
              style={{
                minWidth: "150px",
              }}
            
            >

              <button
                className="btn btn-warning btn-sm w-100 w-lg-auto"
                onClick={() => handleEdit(user)}
              >
                Edit
              </button>

              <button
                className="btn btn-danger btn-sm w-100 w-lg-auto"
                onClick={() =>
                handleDelete(user._id, user.name)
                }
              >
                Delete
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>

      {showModal && (
            <div
              className="modal fade show d-block"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <div className="modal-dialog modal-dialog-scrollable modal-lg">
                <div className="modal-content">

                  <div className="modal-header">
                    <h5>Edit User</h5>

                    <button
                      className="btn-close"
                      onClick={() => setShowModal(false)}
                    ></button>
                  </div>

                  <div className="modal-body">

                    <div className="mb-3">
                      <label>Name</label>

                      <input
                        className="form-control form-control-lg"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label>Email</label>

                      <input
                        className="form-control form-control-lg"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label>Role</label>

                      <select
                        className="form-select form-select-lg"
                        value={formData.role}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            role: e.target.value,
                          })
                        }
                      >
                        <option value="student">Student</option>
                        <option value="organizer">Organizer</option>
                        <option value="mentor">Mentor</option>
                        <option value="hod">HOD</option>
                        <option value="admin">Admin</option>
                      </select>

                      <div className="mb-3">
                          <label>Phone</label>

                          <input
                            className="form-control form-control-lg"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                          />
                        </div>

                        {formData.role === "student" && (
                          <>
                            <hr />

                            <h5>Student Details</h5>

                            <div className="mb-3">

                              <label>Enrollment Number</label>

                              <input
                                className="form-control form-control-lg"
                                value={formData.enrollmentNumber}
                                onChange={(e)=>
                                  setFormData({
                                    ...formData,
                                    enrollmentNumber:e.target.value,
                                  })
                                }
                              />

                            </div>

                            <div className="mb-3">

                              <label>Course</label>

                                <select
                                    className="form-select form-select-lg"
                                    value={formData.course}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        course: e.target.value,
                                      })
                                    }
                                  >
                                    <option value="">Select Course</option>

                                    {COURSES.map((course) => (
                                      <option key={course} value={course}>
                                        {course}
                                      </option>
                                    ))}
                                  </select>

                            </div>
                            <div className="mb-3">
                                <label>Department</label>

                                    <select
                                      className="form-select form-select-lg"
                                      value={formData.department}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          department: e.target.value,
                                        })
                                      }
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

                              <div className="mb-3">
                                  <label>Year</label>
                                      <select
                                      className="form-select form-select-lg"
                                      value={formData.year}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          year: e.target.value,
                                        })
                                      }
                                    >
                                      {YEARS.map((year) => (
                                        <option key={year} value={year}>
                                          {year} Year
                                        </option>
                                      ))}
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label>Semester</label>
                                      <select
                                        className="form-select form-select-lg"
                                        value={formData.semester}
                                        onChange={(e) =>
                                          setFormData({
                                            ...formData,
                                            semester: e.target.value,
                                          })
                                        }
                                      >
                                        {SEMESTERS.map((semester) => (
                                          <option key={semester} value={semester}>
                                            Semester {semester}
                                          </option>
                                        ))}
                                      </select>
                                  </div>

                                  <div className="mb-3">
                                      <label>Section</label>
                                        <select
                                          className="form-select form-select-lg"
                                          value={formData.section}
                                          onChange={(e) =>
                                            setFormData({
                                              ...formData,
                                              section: e.target.value,
                                            })
                                          }
                                        >
                                          <option value="">Select Section</option>

                                          {SECTIONS.map((section) => (
                                            <option key={section} value={section}>
                                              {section}
                                            </option>
                                          ))}
                                        </select>
                                    </div>

                          </>

                        )}
                        {formData.role === "mentor" && (

                      <>
                        <hr />
                        <h5>Mentor Details</h5>

                        <div className="mb-3">

                            <label>Mentor Course</label>

                            <select
                            className="form-select form-select-lg"
                            value={formData.mentorCourse}
                            onChange={(e)=>
                            setFormData({
                            ...formData,
                            mentorCourse:e.target.value,
                            })
                            }
                            >

                            <option value="">Select Course</option>

                            {COURSES.map((course)=>(
                            <option key={course} value={course}>
                            {course}
                            </option>
                            ))}

                            </select>

                            </div>


                            <div className="mb-3">

                              <label>Mentor Department</label>

                              <select
                              className="form-select form-select-lg"
                              value={formData.mentorDepartment}
                              onChange={(e)=>
                              setFormData({
                              ...formData,
                              mentorDepartment:e.target.value,
                              })
                              }
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
                              
                              <div className="mb-3">

                                    <label>Mentor Year</label>

                                    <select
                                    className="form-select form-select-lg"
                                    value={formData.mentorYear}
                                    onChange={(e)=>
                                    setFormData({
                                    ...formData,
                                    mentorYear:e.target.value,
                                    })
                                    }
                                    >

                                    {YEARS.map((year)=>(
                                    <option key={year} value={year}>
                                    {year} Year
                                    </option>
                                    ))}

                                    </select>

                                    </div>

                                    <div className="mb-3">

                                        <label>Mentor Section</label>

                                        <select
                                        className="form-select form-select-lg"
                                        value={formData.mentorSection}
                                        onChange={(e)=>
                                        setFormData({
                                        ...formData,
                                        mentorSection:e.target.value,
                                        })
                                        }
                                        >

                                        <option value="">Select Section</option>

                                        {SECTIONS.map((section)=>(
                                        <option key={section} value={section}>
                                        {section}
                                        </option>
                                        ))}

                                        </select>

                                        </div>

                      </>

                      )}

                      {formData.role === "organizer" && (

                          <>
                          <hr />

                          <h5>Organizer Details</h5>

                          <div className="mb-3">

                          <label>Course</label>

                          <select
                          className="form-select form-select-lg"
                          value={formData.course}
                          onChange={(e)=>
                          setFormData({
                          ...formData,
                          course:e.target.value,
                          })
                          }
                          >

                          <option value="">Select Course</option>

                          {COURSES.map((course)=>(
                          <option key={course} value={course}>
                          {course}
                          </option>
                          ))}

                          </select>

                          </div>

                          <div className="mb-3">

                          <label>Department</label>

                          <select
                          className="form-select form-select-lg"
                          value={formData.department}
                          onChange={(e)=>
                          setFormData({
                          ...formData,
                          department:e.target.value,
                          })
                          }
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

                          </>

                          )}

                          {formData.role === "hod" && (

                              <>
                              <hr />

                              <h5>HOD Details</h5>

                              <div className="mb-3">

                              <label>Course</label>

                              <select
                              className="form-select form-select-lg"
                              value={formData.course}
                              onChange={(e)=>
                              setFormData({
                              ...formData,
                              course:e.target.value,
                              })
                              }
                              >

                              <option value="">Select Course</option>

                              {COURSES.map((course)=>(
                              <option key={course} value={course}>
                              {course}
                              </option>
                              ))}

                              </select>

                              </div>

                              <div className="mb-3">

                              <label>Department</label>

                              <select
                              className="form-select form-select-lg"
                              value={formData.department}
                              onChange={(e)=>
                              setFormData({
                              ...formData,
                              department:e.target.value,
                              })
                              }
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

                              </>

                              )}

                    </div>

                  </div>

                  <div className="modal-footer flex-column flex-md-row">

                    <button
                      className="btn btn-secondary w-100 w-md-auto"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>

                    <button
                      className="btn btn-success w-100 w-md-auto"
                      onClick={handleUpdate}
                    >
                      Save Changes
                    </button>

                  </div>

                </div>
              </div>
            </div>
          )}

    </DashboardLayout>

  );

}

export default ManageUsers;