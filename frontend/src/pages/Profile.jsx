import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getProfile } from "../api/userApi";
import { toast } from "react-toastify";
import API from "../api/axios";
import { ToastContainer } from "react-toastify";

function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwordStatus, setPasswordStatus] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("");
    const [passwordMatch, setPasswordMatch] = useState("");
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    });

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
    const response = await getProfile();

    console.log(response.data);

    setUser(response.data.user);   // <-- YE LINE ADD KARO

    setFormData({
      name: response.data.user.name || "",
      email: response.data.user.email || "",
      phone: response.data.user.phone || "",
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


const handlePasswordChange = async () => {

  console.log("Button Clicked");

  if (
    passwordData.newPassword !== passwordData.confirmPassword
  ) {
    toast.error("Passwords do not match");
    return;
  }

  try {

    console.log("Sending API Request");

    const response = await API.put(
      "/auth/change-password",
      {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      }
    );

    console.log(response.data);

    // Success Toast
    toast.success(
      response.data.message || "Password updated successfully."
    );

    // Clear Fields
    setPasswordData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    // Reset Status
    setPasswordStatus("");

    // Close Form
    setShowPasswordForm(false);

  } catch (err) {

    console.log("API Error:", err);

    toast.error(
      err.response?.data?.message ||
      "Something went wrong"
    );

  }

};

const handleProfileUpdate = async () => {

  try {

    setSaving(true);

    const response = await API.put(
      "/users/profile",
      formData
    );

    toast.success(
      response.data.message || "Profile updated successfully."
    );

    await fetchProfile();

    setIsEditing(false);

  } catch (err) {

    toast.error(
      err.response?.data?.message ||
      "Failed to update profile."
    );

  } finally {

    setSaving(false);

  }

};

const checkOldPassword = async (password) => {

  if (!password) {
    setPasswordStatus("");
    return;
  }

  try {

    const res = await API.post(
      "/auth/check-old-password",
      {
        oldPassword: password,
      }
    );

    if (res.data.success) {

      setPasswordStatus("matched");

    } else {

      setPasswordStatus("unmatched");

    }

  } catch {

    setPasswordStatus("unmatched");

  }

};

const checkStrength = (password) => {

  if (password.length < 6) {

    setPasswordStrength("Weak");

  } else if (

    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    password.length >= 8

  ) {

    setPasswordStrength("Strong");

  } else {

    setPasswordStrength("Medium");

  }

};

  return (
    <>
  <ToastContainer />
    <DashboardLayout>
      <div className="card shadow border-0">

        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">My Profile</h4>
        </div>

        <div className="card-body">
            {loading ? (
        <h5>Loading...</h5>
        ) : (
        <div className="row">

            {/* Left Side */}

            <div className="col-md-4 text-center border-end">

            <img
                src={
                user?.profilePhoto ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt="Profile"
                className="rounded-circle shadow"
                width="170"
                height="170"
            />

            <h4 className="mt-3">
                {user?.name}
            </h4>

            <span className="badge bg-primary">
                {user?.role}
            </span>

            </div>

            {/* Right Side */}

            <div className="col-md-8">

            <div className="row">

                <div className="col-md-6 mb-3">
                <label>Name</label>

                <input
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={
                    !isEditing ||
                    user?.role=== "student"
                    }
                />
                </div>

                <div className="col-md-6 mb-3">
                <label>Email</label>

                <input
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={
                    !isEditing ||
                    user?.role=== "student"
                    }
                />
                </div>

                <div className="col-md-6 mb-3">
                <label>Phone</label>

                <input
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={
                    !isEditing ||
                    user?.role=== "student"
                    }
                />
                </div>

                {/* Student Details */}

                {user?.role === "student" && (
                <>

                    <div className="col-md-6 mb-3">
                    <label>Enrollment</label>

                    <input
                        className="form-control"
                        value={user?.enrollmentNumber}
                        disabled
                    />
                    </div>

                    <div className="col-md-6 mb-3">
                    <label>Course</label>

                    <input
                        className="form-control"
                        value={user?.course}
                        disabled
                    />
                    </div>

                    <div className="col-md-6 mb-3">
                    <label>Year</label>

                    <input
                        className="form-control"
                        value={user?.year}
                        disabled
                    />
                    </div>

                    <div className="col-md-6 mb-3">
                    <label>Semester</label>

                    <input
                        className="form-control"
                        value={user?.semester}
                        disabled
                    />
                    </div>

                    <div className="col-md-6 mb-3">
                    <label>Section</label>

                    <input
                        className="form-control"
                        value={user?.section}
                        disabled
                    />
                    </div>

                </>
                )}

            </div>

                <div className="mt-3">
                      {/* Sirf non-students ke liye */}
                        {!isEditing && user?.role !== "student" && (
                          <button
                            className="btn btn-primary me-2"
                            onClick={() => setIsEditing(true)}
                          >
                            Edit Profile
                          </button>
                        )}
                      {!isEditing ? (

                        <>
                          {/* <button
                            className="btn btn-primary me-2"
                            onClick={() => setIsEditing(true)}
                            disabled={user?.role === "student"}
                          >
                            Edit Profile
                          </button> */}

                          <button
                            className="btn btn-warning"
                            onClick={() => {
                              setShowPasswordForm(!showPasswordForm);

                              setPasswordData({
                                oldPassword: "",
                                newPassword: "",
                                confirmPassword: "",
                              });

                              setPasswordStatus("");
                            }}
                          >
                            {showPasswordForm
                              ? "Close Password Form"
                              : "Change Password"}
                          </button>
                        </>

                      ) : (

                      <>
                      <button
                          className="btn btn-success me-2"
                          onClick={handleProfileUpdate}
                          disabled={saving}
                          >
                          {saving ? "Saving..." : "Save Changes"}
                          </button>

                        <button
                          className="btn btn-secondary me-2"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </button>

                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            setShowPasswordForm(!showPasswordForm);

                            setPasswordData({
                              oldPassword: "",
                              newPassword: "",
                              confirmPassword: "",
                            });

                            setPasswordStatus("");
                          }}
                        >
                          {showPasswordForm
                            ? "Close Password Form"
                            : "Change Password"}
                        </button>
                      </>    
                     )}

                      </div>
                {showPasswordForm && (
                <div className="card mt-4 border-0 shadow">

            <div className="card-header bg-warning">

              <h5 className="mb-0">
                Change Password
              </h5>

            </div>

            <div className="card-body">

                  <input
                    type="password"
                    className="form-control mb-2"
                    placeholder="Old Password"
                    name="oldPassword"
                    autoComplete="new-password"
                    value={passwordData.oldPassword}
                    onChange={(e) => {
                      const value = e.target.value;

                      setPasswordData({
                        ...passwordData,
                        oldPassword: value,
                      });

                      checkOldPassword(value);
                    }}
                  />

                {passwordStatus==="matched" && (

                  <div className="text-success mb-3">

                  ✔ Old Password Matched

                  </div>

                  )}

                  {passwordStatus==="unmatched" && (

                  <div className="text-danger mb-3">

                  ✖ Old Password Incorrect

                  </div>

                  )}

                <input
                    type="password"
                    className="form-control mb-2"
                    placeholder="New Password"
                    name="newPassword"
                    autoComplete="new-password"
                    value={passwordData.newPassword}
                    onChange={(e) => {

                      const value = e.target.value;

                      setPasswordData({
                        ...passwordData,
                        newPassword: value,
                      });

                      checkStrength(value);

                    }}
                  />

                  {passwordStrength === "Weak" && (
                    <div className="text-danger mb-2">
                      🔴 Weak Password
                    </div>
                  )}

                  {passwordStrength === "Medium" && (
                    <div className="text-warning mb-2">
                      🟡 Medium Password
                    </div>
                  )}

                  {passwordStrength === "Strong" && (
                    <div className="text-success mb-2">
                      🟢 Strong Password
                    </div>
                  )}

              <input
                  type="password"
                  className="form-control mb-2"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  autoComplete="new-password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => {

                    const value = e.target.value;

                    setPasswordData({
                      ...passwordData,
                      confirmPassword: value,
                    });

                    if (value === passwordData.newPassword) {

                      setPasswordMatch("matched");

                    } else {

                      setPasswordMatch("unmatched");

                    }

                  }}
                />

                {passwordMatch === "matched" && (
                  <div className="text-success mb-3">
                    ✔ Password Matched
                  </div>
                )}

                {passwordMatch === "unmatched" && (
                  <div className="text-danger mb-3">
                    ✖ Password Doesn't Match
                  </div>
                )}

              <button
                className="btn btn-warning"
                onClick={handlePasswordChange}
              >
                Change Password
              </button>

            </div>

          </div>
        )}
    </div>

  </div>
)}
        </div>

      </div>
    </DashboardLayout>
    </>
  );
}

export default Profile;