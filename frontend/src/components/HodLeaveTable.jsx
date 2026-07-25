import { ToastContainer, toast } from "react-toastify";
import { hodApproval } from "../api/hodApi";
import { useState } from "react";
import RemarkModal from "./RemarkModal";

function HodLeaveTable({ leaves, fetchLeaves, fetchStats }) {

  const [processingId, setProcessingId] = useState(null);
  const [showRemarkModal, setShowRemarkModal] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [remark, setRemark] = useState("");

  const handleDecision = async (id, status) => {

      if (status === "Approved") {

        try {

          setProcessingId(id);

          await hodApproval(id, {
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

      // Reject
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

        await hodApproval(selectedLeave, {
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
          error.response?.data?.message ||
          "Something went wrong"
        );

      } finally {

        setProcessingId(null);

      }
    };

  return (
    <>
      <ToastContainer />

      <div className="card shadow-sm mt-4 border-0">

        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">
            Mentor Approved Requests
          </h5>
        </div>

        <div className="table-responsive">

          <table className="table table-bordered table-hover mb-0">

            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Student</th>
                <th>Enrollment</th>
                {/* <th>Department</th> */}
                <th>Event</th>
                <th>Mentor Status</th>
                <th>HOD Status</th>
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

                    {/* <td>{leave.student?.department}</td> */}

                    <td>{leave.eventName}</td>

                    <td>
                      <span className="badge bg-success">
                        {leave.mentorStatus}
                      </span>
                    </td>

                    <td>
                      <span className="badge bg-warning">
                        {leave.hodStatus}
                      </span>
                    </td>

                    <td>

                      <button
                        disabled={processingId === leave._id}
                        className="btn btn-success btn-sm me-2"
                        onClick={() =>
                          handleDecision(leave._id, "Approved")
                        }
                      >
                        Approve
                      </button>

                      <button
                        disabled={processingId === leave._id}
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          handleDecision(leave._id, "Rejected")
                        }
                      >
                        Reject
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td colSpan="8" className="text-center">
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

export default HodLeaveTable;