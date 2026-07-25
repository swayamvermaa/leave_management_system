import API from "./axios";

export const getDashboardStats = () => {
  return API.get("/admin/dashboard");
};
export const getAllUsers = () => {
  return API.get("/admin/users");
};
export const createUser = (data) => {
  return API.post("/admin/users", data);
};
export const updateUser = (id, data) => {
  return API.put(`/admin/users/${id}`, data);
};
export const deleteUser = (id) => {
  return API.delete(`/admin/users/${id}`);
};
export const getAdminProfile = () => {
  return API.get("/admin/profile");
}; 
export const updateAdminProfile = (data) => {
  return API.put("/admin/profile", data);
};