import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DashboardLayout from "../layouts/DashboardLayout";
import {
    createEvent,
    getOrganizers,
    getEvents,
    deleteEvent,
    updateEvent,
} from "../api/eventApi";

function ManageEvents() {
  const [organizers, setOrganizers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEventId, setEditingEventId] = useState(null);
  const [formData, setFormData] = useState({
    eventName: "",
    organizer: "",
    course: "",
    year: "",
    section: "",
    venue: "",
    maxParticipants: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchOrganizers();
    fetchEvents();
  }, []);

  const fetchOrganizers = async () => {
    try {
      const res = await getOrganizers();
      setOrganizers(res.data.data);
       console.log(res.data);
      setOrganizers(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load organizers");
    }
  };
  const fetchEvents = async () => {
    try {
      const res = await getEvents();

      setEvents(res.data.data);

    } catch (error) {

      console.log(error);

      toast.error("Failed to load events");

    } finally {

      setLoading(false);

    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (event) => {
  setEditingEventId(event._id);

  setFormData({
    eventName: event.eventName,
    organizer: event.organizer?._id || event.organizer,
    course: event.course,
    year: event.year,
    section: event.section,
    venue: event.venue,
    maxParticipants: event.maxParticipants,
    description: event.description,
    startDate: event.startDate.split("T")[0],
    endDate: event.endDate.split("T")[0],
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (
    !formData.eventName ||
    !formData.organizer ||
    !formData.course ||
    !formData.year ||
    !formData.section ||
    !formData.startDate ||
    !formData.endDate
  ) {
    return toast.error("Please fill all required fields");
  }

  if (
    new Date(formData.endDate) <
    new Date(formData.startDate)
  ) {
    return toast.error(
      "End date cannot be before start date"
    );
  }

  try {
    if (editingEventId) {
    await updateEvent(editingEventId, formData);

    toast.success("Event Updated Successfully");
  } else {
    await createEvent(formData);

    toast.success("Event Created Successfully");
  }

fetchEvents();
    fetchEvents();

    setFormData({
      eventName: "",
      organizer: "",
      course: "",
      year: "",
      section: "",
      venue: "",
      maxParticipants: "",
      description: "",
      startDate: "",
      endDate: "",
    });
    setEditingEventId(null);

  } catch (error) {

    console.log(error);

    toast.error(
      error.response?.data?.message ||
      "Failed to save event"
    );
  }
};

const handleDelete = async (id) => {

  if (!window.confirm("Delete this event?"))
    return;

  try {

    const res = await deleteEvent(id);

    toast.success(res.data.message);

    fetchEvents();

  } catch (error) {

    console.log(error);

    toast.error("Delete failed");

  }

};

  return (
    <DashboardLayout>
      
        <div className="container-fluid">

  <div className="card shadow border-0">

    <div className="card-header bg-primary text-white">
      <h3 className="mb-0">Create Event</h3>
    </div>
    <div className="card shadow border-0 mt-4">

  <div className="card-header bg-success text-white d-flex justify-content-between">

    <h4 className="mb-0">
      Event List
    </h4>

    <span className="badge bg-light text-dark">

      {events.length} Events

    </span>

  </div>

  <div className="card-body">

    {loading ? (

      <h5>Loading...</h5>

    ) : (

      <div className="table-responsive">

        <table className="table table-bordered table-hover">

          <thead>

            <tr>

              <th>Event</th>

              <th>Organizer</th>

              <th>Course</th>

              <th>Year</th>

              <th>Section</th>

              <th>Dates</th>

              <th>Status</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {events.length > 0 ? (

              events.map((event) => (

                <tr key={event._id}>

                  <td>{event.eventName}</td>

                  <td>

                    {event.organizer?.name}

                  </td>

                  <td>{event.course}</td>

                  <td>{event.year}</td>

                  <td>{event.section}</td>

                  <td>

                    {new Date(
                      event.startDate
                    ).toLocaleDateString()}

                    <br />

                    {new Date(
                      event.endDate
                    ).toLocaleDateString()}

                  </td>

                  <td>

                    {event.isActive ? (

                      <span className="badge bg-success">

                        Active

                      </span>

                    ) : (

                      <span className="badge bg-danger">

                        Inactive

                      </span>

                    )}

                  </td>

                  <td>

                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(event)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() =>
                        handleDelete(event._id)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="8"
                  className="text-center"
                >

                  No Events Found

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    )}

  </div>

</div>

    <div className="card-body">

      <div className="row">

        {/* Event Name */}

        <div className="col-md-6 mb-3">
          <label className="form-label">
            Event Name
          </label>

          <input
            type="text"
            className="form-control"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
          />
        </div>

        {/* Organizer */}

        <div className="col-md-6 mb-3">
          <label className="form-label">
            Organizer
          </label>

          <select
            className="form-select"
            name="organizer"
            value={formData.organizer}
            onChange={handleChange}
          >
            <option value="">
              Select Organizer
            </option>

            {organizers.map((org) => (
              <option
                key={org._id}
                value={org._id}
              >
                {org.name}
              </option>
            ))}

          </select>
        </div>

        {/* Course */}

        <div className="col-md-4 mb-3">

          <label className="form-label">
            Course
          </label>

          <select
            className="form-select"
            name="course"
            value={formData.course}
            onChange={handleChange}
          >
            <option value="">Select</option>

            <option>B.Tech</option>
            <option>BCA</option>
            <option>BBA</option>

          </select>

        </div>

        {/* Year */}

        <div className="col-md-4 mb-3">

          <label className="form-label">
            Year
          </label>

          <select
            className="form-select"
            name="year"
            value={formData.year}
            onChange={handleChange}
          >
            <option value="">Select</option>

            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>

          </select>

        </div>



        <div className="col-md-4 mb-3">

          <label className="form-label">
            Section
          </label>

          <select
            className="form-select"
            name="section"
            value={formData.section}
            onChange={handleChange}
          >
            <option value="">Select</option>

            <option>A</option>
            <option>B</option>
            <option>C</option>

          </select>

        </div>

        <div className="col-md-6 mb-3">
  <label className="form-label">
    Venue
  </label>

  <input
    type="text"
    className="form-control"
    name="venue"
    value={formData.venue}
    onChange={handleChange}
  />
</div>

<div className="col-md-6 mb-3">
  <label className="form-label">
    Maximum Participants
  </label>

  <input
    type="number"
    className="form-control"
    name="maxParticipants"
    value={formData.maxParticipants}
    onChange={handleChange}
  />
</div>
<div className="col-md-6 mb-3">
  <label className="form-label">
    Start Date
  </label>

  <input
    type="date"
    className="form-control"
    name="startDate"
    value={formData.startDate}
    onChange={handleChange}
  />
</div>

<div className="col-md-6 mb-3">
  <label className="form-label">
    End Date
  </label>

  <input
    type="date"
    className="form-control"
    name="endDate"
    value={formData.endDate}
    onChange={handleChange}
  />
</div>

<div className="col-12 mb-3">
  <label className="form-label">
    Description
  </label>

  <textarea
    rows="4"
    className="form-control"
    name="description"
    value={formData.description}
    onChange={handleChange}
  />
</div>

<div className="text-end">

  <button
    className="btn btn-primary px-4"
    onClick={handleSubmit}
  >
    {editingEventId ? "Update Event" : "Create Event"}
  </button>

</div>
{editingEventId && (
  <button
    type="button"
    className="btn btn-secondary ms-2"
    onClick={() => {
      setEditingEventId(null);

      setFormData({
        eventName: "",
        organizer: "",
        course: "",
        year: "",
        section: "",
        venue: "",
        maxParticipants: "",
        description: "",
        startDate: "",
        endDate: "",
      });
    }}
  >
    Cancel
  </button>
)}

      </div>

    </div>
    </div>
    </div>
    </DashboardLayout>
  );
}

export default ManageEvents;