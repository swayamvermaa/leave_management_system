import { organizerApproval } from "../api/organizerApi";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import RemarkModal from "../components/RemarkModal";

function OrganizerLeaveTable({ leaves, fetchLeaves, fetchStats,}) {
  const [processingId, setProcessingId] = useState(null);
  const [showRemarkModal, setShowRemarkModal] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [remark, setRemark] = useState("");

const handleDecision = async (id, status) => {

  // Approve directly
  if (status === "Approved") {
    try {
      setProcessingId(id);

      await organizerApproval(id, {
        status: "Approved",
      });

      toast.success("Leave Approved");

      fetchLeaves();
      fetchStats();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );

    } finally {
      setProcessingId(null);
    }

    return;
  }

  // Reject → Open Modal
  setSelectedLeave(id);

  setRemark("");

  setShowRemarkModal(true);

};

const submitReject = async () => {
  if (!remark.trim()) {
    return toast.error("Remark is required");
  }

  try {
    setProcessingId(selectedLeave);

    await organizerApproval(selectedLeave, {
      status: "Rejected",
      remarks: remark,
    });

    toast.success("Leave Rejected");

    setShowRemarkModal(false);
    setRemark("");
    setSelectedLeave(null);

    fetchLeaves();
    fetchStats();
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Something went wrong"
    );
  } finally {
    setProcessingId(null);
  }
};

  return (
    <>
      <ToastContainer />

      <div className="card shadow-sm border-0 mt-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Pending Leave Requests</h5>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover mb-0">

            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Student</th>
                <th>Enrollment</th>
                <th>Course</th>
                <th>Year</th>
                <th>Semester</th>
                <th>Section</th>
                <th>Venue</th>
                <th>Event</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {leaves.length > 0 ? (

                leaves.map((leave) => (

                  <tr key={leave._id}>

                    <td>{leave._id.slice(-6)}</td>

                    <td>{leave.student?.name}</td>

                    <td>{leave.student?.enrollmentNumber}</td>

                    <td>{leave.student?.course}</td>

                    <td>{leave.student?.year}</td>

                    <td>{leave.student?.semester}</td>

                    <td>{leave.student?.section}</td>
                    <td>{leave.event?.venue}</td>

                  <td>{leave.event?.eventName}</td>

                  <td>{new Date(leave.fromDate).toLocaleDateString()}</td>

                  <td>{new Date(leave.toDate).toLocaleDateString()}</td>

                    <td>
                      <span
                        className={`badge ${
                          leave.organizerStatus === "Approved"
                            ? "bg-success"
                            : leave.organizerStatus === "Rejected"
                            ? "bg-danger"
                            : "bg-warning"
                        }`}
                      >
                        {leave.organizerStatus}
                      </span>
                    </td>
                    <td>
                        <button
                          disabled={processingId === leave._id}
                          className="btn btn-success btn-sm me-2"
                          onClick={() => handleDecision(leave._id, "Approved")}
                        >
                          Approve
                        </button>

                        <button
                          disabled={processingId === leave._id}
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDecision(leave._id, "Rejected")}
                        >
                          Reject
                        </button>
                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td colSpan="13" className="text-center">
                    No Pending Requests
                  </td>
                </tr>

              )}

            </tbody>

          </table>
        </div>
        <RemarkModal
          show={showRemarkModal}
          title="Reject Leave"
          remark={remark}
          setRemark={setRemark}
          onClose={() => {
            setShowRemarkModal(false);
            setRemark("");
            setSelectedLeave(null);
          }}
          onSubmit={submitReject}
        />
      </div>
    </>
  );
}

export default OrganizerLeaveTable;