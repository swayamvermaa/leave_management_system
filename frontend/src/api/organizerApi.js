import API from "./axios";

export const getOrganizerLeaves = () => {
  return API.get("/leave/organizer");
};

export const organizerApproval = (id, data) => {
  return API.put(`/leave/organizer/${id}`, data);
};
export const getOrganizerStats = () => {
  return API.get("/leave/organizer/stats");
};