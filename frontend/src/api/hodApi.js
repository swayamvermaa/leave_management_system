import API from "./axios";

export const getHodLeaves = () => {
  return API.get("/leave/hod");
};

export const hodApproval = (id, data) => {
  return API.put(`/leave/hod/${id}`, data);
};
export const getHodStats = () => {
  return API.get("/leave/hod/stats");
};