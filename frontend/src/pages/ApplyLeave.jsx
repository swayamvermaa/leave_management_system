// 
// import DashboardLayout from "../layouts/DashboardLayout";

// function ApplyLeave() {
//   return (
//     <DashboardLayout>
//       <h2>Apply Leave</h2>
//     </DashboardLayout>
//   );
// }

// export default ApplyLeave;
import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { toast, ToastContainer } from "react-toastify";

function ApplyLeave() {
  const [formData, setFormData] = useState({
    studentName: "",
    enrollmentNo: "",
    department: "",
    semester: "",
    eventName: "",
    organizerName: "",
    leaveFrom: "",
    leaveTo: "",
    reason: "",
    proof: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "proof") {
      setFormData({
        ...formData,
        proof: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.studentName ||
      !formData.enrollmentNo ||
      !formData.department ||
      !formData.semester ||
      !formData.eventName ||
      !formData.organizerName ||
      !formData.leaveFrom ||
      !formData.leaveTo ||
      !formData.reason
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    toast.success("Leave Application Submitted Successfully!");

    console.log(formData);

    setFormData({
      studentName: "",
      enrollmentNo: "",
      department: "",
      semester: "",
      eventName: "",
      organizerName: "",
      leaveFrom: "",
      leaveTo: "",
      reason: "",
      proof: null,
    });

    document.getElementById("proof").value = "";
  };

  return (
    <DashboardLayout>
      <ToastContainer />

      <div className="card shadow border-0">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Apply for Duty Leave</h4>
        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                <label className="form-label">Student Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                <label className="form-label">Enrollment Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="enrollmentNo"
                  value={formData.enrollmentNo}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                <label className="form-label">Department</label>
                <input
                  type="text"
                  className="form-control"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                <label className="form-label">Semester</label>
                <input
                  type="text"
                  className="form-control"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                <label className="form-label">Event Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                <label className="form-label">Organizer Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="organizerName"
                  value={formData.organizerName}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                <label className="form-label">Leave From</label>
                <input
                  type="date"
                  className="form-control"
                  name="leaveFrom"
                  value={formData.leaveFrom}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                <label className="form-label">Leave To</label>
                <input
                  type="date"
                  className="form-control"
                  name="leaveTo"
                  value={formData.leaveTo}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 mb-3">
                <label className="form-label">Reason</label>
                <textarea
                  className="form-control"
                  rows="4"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="col-12 mb-4">
                <label className="form-label">Upload Proof</label>
                <input
                  type="file"
                  id="proof"
                  className="form-control"
                  name="proof"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="d-flex gap-3">

              <button
                type="submit"
                className="btn btn-primary"
              >
                Submit Application
              </button>

              <button
                type="reset"
                className="btn btn-secondary"
              >
                Reset
              </button>

            </div>

          </form>

        </div>
      </div>

    </DashboardLayout>
  );
}

export default ApplyLeave;