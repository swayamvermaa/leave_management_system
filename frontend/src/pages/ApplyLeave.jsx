// export default ApplyLeave;
import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { toast, ToastContainer } from "react-toastify";
import API from "../api/axios";
import { getStudentEvents } from "../api/eventApi";

function ApplyLeave() {
  const [formData, setFormData] = useState({
      studentName: "",
      enrollmentNo: "",
      course: "",
      year: "",
      section: "",
      semester: "",

      event: "",
      eventName: "",

      organizer: "",      
      organizerId: "",    

      leaveFrom: "",
      leaveTo: "",
      reason: "",
      proof: null,
      });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setFormData((prev) => ({
        ...prev,
        studentName: user.name || "",
        enrollmentNo: user.enrollmentNumber || "",
        course: user.course || "",
        year: user.year || "",
        section: user.section || "",
        semester: user.semester || "",
      }));
    }
  }, []);


const handleChange = (e) => {

  const { name, value } = e.target;

  if (name === "event") {

    const selectedEvent = events.find(
      (event) => event._id === value
    );

    setFormData({
      ...formData,
      event: value,
      eventName: selectedEvent?.eventName || "",
      organizer: selectedEvent?.organizer?.name || "",
      organizerId: selectedEvent?.organizer?._id || "",
    });

    return;
  }

  setFormData({
    ...formData,
    [name]: value,
  });

};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
        !formData.event ||
        !formData.leaveFrom ||
        !formData.leaveTo ||
        !formData.reason
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const response = await API.post("/leave/apply", {
      event: formData.event,
      organizer: formData.organizerId,

      eventName: formData.eventName,
      organizer: formData.organizerId,
      organizerName: formData.organizer,

      fromDate: formData.leaveFrom,
      toDate: formData.leaveTo,
      reason: formData.reason,
    });

      toast.success(response.data.message);

      setFormData((prev) => ({
          event: "",
          organizerId: "",
          eventName: "",
          organizer: "",
          leaveFrom: "",
          leaveTo: "",
          reason: "",
          proof: null,
      }));

      document.getElementById("proof").value = "";
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to apply leave"
      );
    }
  };
  const [events, setEvents] = useState([]);
  useEffect(() => {
  fetchEvents();
}, []);

const fetchEvents = async () => {
  try {

    const res = await getStudentEvents();

    setEvents(res.data.data);

  } catch (error) {

    console.log(error);

    toast.error("Failed to load events");

  }
};

console.log("Events State:", events);

  return (
    <DashboardLayout>
      <ToastContainer />

      <div className="card shadow border-0">

        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Apply Duty Leave</h4>
        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label>Student Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.studentName}
                  readOnly
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Enrollment Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.enrollmentNo}
                  readOnly
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Course</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.course}
                  readOnly
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Year</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.year}
                  readOnly
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Section</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.section}
                  readOnly
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Semester</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.semester}
                  readOnly
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Event
                </label>

                <select
                  className="form-select"
                  name="event"
                  value={formData.event}
                  onChange={handleChange}
                >
                  <option value="">
                    Select Event
                  </option>

                  {events.map((event) => (
                    <option
                      key={event._id}
                      value={event._id}
                    >
                      {event.eventName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-3">
              <label className="form-label">
              Organizer
              </label>
              <input
                  type="text"
                  className="form-control"
                  value={formData.organizer}
                  readOnly
              />
              </div>

              <div className="col-md-6 mb-3">
                <label>Leave From</label>
                <input
                  type="date"
                  className="form-control"
                  name="leaveFrom"
                  value={formData.leaveFrom}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Leave To</label>
                <input
                  type="date"
                  className="form-control"
                  name="leaveTo"
                  value={formData.leaveTo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12 mb-3">
                <label>Reason</label>
                <textarea
                  className="form-control"
                  rows="4"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12 mb-4">
                <label>Upload Proof (Optional)</label>
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

            <button
              type="submit"
              className="btn btn-primary"
            >
              Apply Leave
            </button>

          </form>

        </div>
      </div>
    </DashboardLayout>
  );
}

export default ApplyLeave;