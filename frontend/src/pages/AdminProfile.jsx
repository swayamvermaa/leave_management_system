import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  getAdminProfile,
  updateAdminProfile,
} from "../api/adminApi";
import { toast } from "react-toastify";
import API from "../api/axios";
import { ToastContainer } from "react-toastify";
import Loader from "../components/Loader";

function AdminProfile() {

  const [admin, setAdmin] = useState(null);

  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);

  const [saving, setSaving] = useState(false);

  const [passwordLoading, setPasswordLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
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

    setSaving(true);

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

  }finally {

    setSaving(false);

  }

};

const handlePasswordChange = async () => {

  if (
    passwordData.newPassword !==
    passwordData.confirmPassword
  ) {
    toast.error("Passwords do not match");
    return;
  }

  try {

    setPasswordLoading(true);
    const response = await API.put(
      "/auth/change-password",
      {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      }
    );

    toast.success(response.data.message);

    setPasswordData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setShowPasswordForm(false);

  } catch (err) {

    toast.error(
      err.response?.data?.message ||
      "Failed to change password"
    );

  } finally {

  setPasswordLoading(false);

}

};

if (loading) {
  return <Loader />;
}

  return (

    <DashboardLayout>
      <ToastContainer />

      <div className="card shadow border-0 rounded-4">

        <div className="card-header bg-dark text-white">

          <h3>Admin Profile</h3>

        </div>

        <div className="card-body">

          {loading ? (

            <h5>Loading...</h5>

          ) : (

            <div className="row g-4 align-items-center">

              <div className="col-12 col-md-4 text-center">

                <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="Profile"
                    className="rounded-circle shadow img-fluid"
                    style={{
                      width: "170px",
                      maxWidth: "100%",
                    }}
                  />

                <h4 className="mt-3">
                  {admin.name}
                </h4>

                <span className="badge bg-danger">
                  ADMIN
                </span>

              </div>

              <div className="col-12 col-md-8">

                <div className="mb-3">

                  <label>Name</label>

                  <input
                    className="form-control form-control-lg"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />

                </div>

                <div className="mb-3">

                  <label>Email</label>

                  <input
                    className="form-control form-control-lg"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />

                </div>

                <div className="mb-3">

                  <label>Phone</label>

                  <input
                    className="form-control form-control-lg"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />

                </div>

                {!isEditing ? (

                   <div className="d-grid d-md-flex gap-2 mt-3">
                    <button
                      className="btn btn-primary w-100 w-md-auto"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </button>

                    <button
                      className="btn btn-warning ms-2"
                      onClick={() =>
                        setShowPasswordForm(!showPasswordForm)
                      }
                    >
                      {showPasswordForm
                        ? "Close Password Form"
                        : "Change Password"}
                    </button>
                  </div>

                ) : (

                 <div className="d-grid d-md-flex gap-2 mt-3">
                  <button
                    className="btn btn-success w-100 w-md-auto"
                    onClick={handleUpdate}
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>

                  <button
                    className="btn btn-secondary w-100 w-md-auto"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>

                  <button
                    className="btn btn-warning w-100 w-md-auto"
                    onClick={() =>
                      setShowPasswordForm(!showPasswordForm)
                    }
                  >
                    {showPasswordForm
                      ? "Close Password Form"
                      : "Change Password"}
                  </button>
                </div>

                )}

              </div>

                 {showPasswordForm && (
                <div className="col-12 mt-4">
                  <div className="card shadow border-0">

                    <div className="card-header bg-warning">
                      <h5 className="mb-0">Change Password</h5>
                    </div>

                    <div className="card-body">

                      <input
                        type="password"
                        className="form-control form-control-lg mb-3"
                        placeholder="Old Password"
                        value={passwordData.oldPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            oldPassword: e.target.value,
                          })
                        }
                      />

                      <input
                        type="password"
                        className="form-control form-control-lg mb-3"
                        placeholder="New Password"
                        value={passwordData.newPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            newPassword: e.target.value,
                          })
                        }
                      />

                      <input
                        type="password"
                        className="form-control form-control-lg mb-3"
                        placeholder="Confirm Password"
                        value={passwordData.confirmPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            confirmPassword: e.target.value,
                          })
                        }
                      />

                      <button
                        className="btn btn-warning w-100"
                        onClick={handlePasswordChange}
                        disabled={passwordLoading}
                      >
                       {passwordLoading ? "Changing..." : "Change Password"}
                      </button>

                    </div>

                  </div>
                </div>
              )}

            </div>

          )}

        </div>


      </div>

    </DashboardLayout>

  );

}

export default AdminProfile;