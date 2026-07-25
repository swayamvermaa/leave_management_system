import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getProfile } from "../api/userApi";
import { toast } from "react-toastify";

function Profile() {
    const [user, setUser] = useState(null);
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
  return (
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

                {!isEditing ? (

                user?.role !== "student" && (

                    <button
                    className="btn btn-primary"
                    onClick={() =>
                        setIsEditing(true)
                    }
                    >
                    Edit Profile
                    </button>

                )

                ) : (

                <>
                    <button
                    className="btn btn-success me-2"
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

  </div>
)}
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Profile;