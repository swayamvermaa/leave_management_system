import API from "./axios";

export const getMentorLeaves = () => {
  return API.get("/leave/mentor");
};

export const mentorApproval = (id, data) => {
  return API.put(`/leave/mentor/${id}`, data);
};
export const getMentorStats = () => {
  return API.get("/leave/mentor/stats");
};