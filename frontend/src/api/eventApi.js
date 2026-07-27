import API from "./axios";

// Get all active events
export const getEvents = () => API.get("/events");

// Create event
export const createEvent = (data) =>
  API.post("/events", data);

// Update event
export const updateEvent = (id, data) => {
  return API.put(`/events/${id}`, data);
};
// Delete event
export const deleteEvent = (id) =>
  API.delete(`/events/${id}`);

// Get all organizers
export const getOrganizers = () =>
  API.get("/admin/organizers");

export const getStudentEvents = () =>
  API.get("/events/student");

export const getUpcomingEvents = () => {
  return API.get("/events/upcoming");
};

export const getLatestEvents = () => {
  return API.get("/events/latest");
};