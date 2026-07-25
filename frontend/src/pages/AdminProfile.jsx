import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  getAdminProfile,
  updateAdminProfile,
} from "../api/adminApi";
import { toast } from "react-toastify";

function AdminProfile() {

  const [admin, setAdmin] = useState(null);

  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {

    try {

      const response = await getAdminProfile();

      setAdmin(response.data.data);

      setFormData({
        name: response.data.data.name || "",
        email: response.data.data.email || "",
        phone: response.data.data.phone || "",
      });

    } catch (error) {

      console.log(error);

      toast.error("Failed to load profile");

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

const handleUpdate = async () => {

  try {

    const response = await updateAdminProfile(formData);

    toast.success(response.data.message);

    setAdmin(response.data.data);

    setIsEditing(false);

  } catch (error) {

    console.log(error);

    toast.error(
      error.response?.data?.message ||
      "Update Failed"
    );

  }

};

  return (

    <DashboardLayout>

      <div className="card shadow">

        <div className="card-header bg-dark text-white">

          <h3>Admin Profile</h3>

        </div>

        <div className="card-body">

          {loading ? (

            <h5>Loading...</h5>

          ) : (

            <div className="row">

              <div className="col-md-4 text-center">

                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="Profile"
                  width="180"
                  className="rounded-circle shadow"
                />

                <h4 className="mt-3">
                  {admin.name}
                </h4>

                <span className="badge bg-danger">
                  ADMIN
                </span>

              </div>

              <div className="col-md-8">

                <div className="mb-3">

                  <label>Name</label>

                  <input
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />

                </div>

                <div className="mb-3">

                  <label>Email</label>

                  <input
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />

                </div>

                <div className="mb-3">

                  <label>Phone</label>

                  <input
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />

                </div>

                {!isEditing ? (

                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      setIsEditing(true)
                    }
                  >
                    Edit Profile
                  </button>

                ) : (

                  <>
                    <button
                      className="btn btn-success me-2"
                      onClick={handleUpdate}
                    >
                      Save Changes
                    </button>

                    <button
                      className="btn btn-secondary"
                      onClick={() =>
                        setIsEditing(false)
                      }
                    >
                      Cancel
                    </button>
                  </>

                )}

              </div>

            </div>

          )}

        </div>

      </div>

    </DashboardLayout>

  );

}

export default AdminProfile;