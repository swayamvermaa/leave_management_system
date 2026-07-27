import API from "./axios";

// Get logged-in student's fully approved leaves
export const getApprovedMyLeaves = () => {
  return API.get("/leave/my-approved-leaves");
};