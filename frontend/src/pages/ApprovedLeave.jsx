import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getApprovedMyLeaves } from "../api/leaveApi";
import { toast, ToastContainer } from "react-toastify";
import jsPDF from "jspdf";
import { FaDownload } from "react-icons/fa";
import html2canvas from "html2canvas";

function ApprovedLeave() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApprovedLeaves();
  }, []);

  const fetchApprovedLeaves = async () => {
    try {
      const response = await getApprovedMyLeaves();

      setLeaves(response.data.data || []);
    } catch (error) {
      console.error("Approved Leave Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load approved leaves"
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  

const downloadPDF = (leave) => {
  const doc = new jsPDF("p", "mm", "a4");

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  const primaryColor = [13, 110, 253];
  const successColor = [25, 135, 84];
  const darkColor = [33, 37, 41];
  const mutedColor = [108, 117, 125];
  const lightColor = [248, 249, 250];
  const borderColor = [220, 220, 220];

  let y = 15;

  // ==========================================
  // HELPER FUNCTIONS
  // ==========================================

  const formatDatePDF = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Page footer
  const addFooter = () => {
    doc.setTextColor(...mutedColor);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);

    doc.text(
      `Generated on: ${formatDateTime(new Date())}`,
      margin,
      pageHeight - 8
    );

    doc.text(
      "System Generated Duty Leave Approval Certificate",
      pageWidth - margin,
      pageHeight - 8,
      { align: "right" }
    );
  };

  // Check page space
  const checkPageSpace = (requiredHeight = 20) => {
    if (y + requiredHeight > pageHeight - 18) {
      addFooter();
      doc.addPage();
      y = 18;
      return true;
    }

    return false;
  };

  // Section heading
  const addSectionTitle = (title) => {
    checkPageSpace(18);

    doc.setFillColor(...primaryColor);

    doc.roundedRect(
      margin,
      y,
      contentWidth,
      9,
      2,
      2,
      "F"
    );

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);

    doc.text(
      title,
      margin + 5,
      y + 6
    );

    y += 14;

    doc.setTextColor(...darkColor);
  };

  // Field
  const addField = (label, value, x, width) => {
    const text = String(value || "-");

    const lines = doc.splitTextToSize(
      text,
      width
    );

    const requiredHeight =
      Math.max(12, lines.length * 5 + 7);

    checkPageSpace(requiredHeight);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...mutedColor);

    doc.text(
      label,
      x,
      y
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...darkColor);

    doc.text(
      lines,
      x,
      y + 5
    );

    return requiredHeight;
  };

  // ==========================================
  // PAGE 1 HEADER
  // ==========================================

  doc.setFillColor(...primaryColor);

  doc.rect(
    0,
    0,
    pageWidth,
    38,
    "F"
  );

  doc.setTextColor(255, 255, 255);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(17);

  doc.text(
    "CAMPUS DUTY LEAVE MANAGEMENT SYSTEM",
    pageWidth / 2,
    13,
    {
      align: "center",
    }
  );

  doc.setFontSize(12);

  doc.text(
    "DUTY LEAVE APPROVAL CERTIFICATE",
    pageWidth / 2,
    22,
    {
      align: "center",
    }
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);

  doc.text(
    "Official Leave Approval Record",
    pageWidth / 2,
    29,
    {
      align: "center",
    }
  );

  doc.setTextColor(...darkColor);

  y = 48;

  // ==========================================
  // CERTIFICATE INFO
  // ==========================================

  doc.setFillColor(...lightColor);

  doc.roundedRect(
    margin,
    y,
    contentWidth,
    20,
    3,
    3,
    "F"
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...mutedColor);

  doc.text(
    "LEAVE ID",
    margin + 5,
    y + 7
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...darkColor);

  doc.text(
    leave._id || "-",
    margin + 5,
    y + 13
  );

  doc.setFont("helvetica", "bold");
  doc.setTextColor(...mutedColor);

  doc.text(
    "FINAL STATUS",
    pageWidth - 65,
    y + 7
  );

  doc.setTextColor(...successColor);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);

  doc.text(
    leave.finalStatus || "Approved",
    pageWidth - 65,
    y + 14
  );

  y += 30;

  // ==========================================
  // STUDENT DETAILS
  // ==========================================

  addSectionTitle("STUDENT DETAILS");

  addField(
    "Student Name",
    leave.student?.name,
    margin,
    75
  );

  addField(
    "Enrollment Number",
    leave.student?.enrollmentNumber,
    105,
    75
  );

  y += 13;

  addField(
    "Email",
    leave.student?.email,
    margin,
    75
  );

  addField(
    "Course",
    leave.student?.course,
    105,
    35
  );

  addField(
    "Year",
    leave.student?.year,
    145,
    20
  );

  addField(
    "Section",
    leave.student?.section,
    175,
    20
  );

  y += 15;

  // ==========================================
  // EVENT DETAILS
  // ==========================================

  addSectionTitle("EVENT DETAILS");

  addField(
    "Event Name",
    leave.event?.eventName ||
      leave.eventName,
    margin,
    85
  );

  addField(
    "Organizer",
    leave.organizer?.name ||
      leave.organizerName,
    110,
    75
  );

  y += 13;

  addField(
    "Venue",
    leave.event?.venue ||
      "Venue not specified",
    margin,
    85
  );

  addField(
    "Event Start",
    formatDatePDF(
      leave.event?.startDate
    ),
    110,
    35
  );

  addField(
    "Event End",
    formatDatePDF(
      leave.event?.endDate
    ),
    155,
    35
  );

  y += 15;

  // ==========================================
  // LEAVE DETAILS
  // ==========================================

  addSectionTitle("LEAVE DETAILS");

  addField(
    "Leave From",
    formatDatePDF(
      leave.fromDate
    ),
    margin,
    75
  );

  addField(
    "Leave To",
    formatDatePDF(
      leave.toDate
    ),
    105,
    75
  );

  y += 13;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...mutedColor);

  doc.text(
    "Reason",
    margin,
    y
  );

  y += 5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...darkColor);

  const reasonLines =
    doc.splitTextToSize(
      leave.reason || "-",
      contentWidth
    );

  checkPageSpace(
    reasonLines.length * 5 + 10
  );

  doc.text(
    reasonLines,
    margin,
    y
  );

  y += reasonLines.length * 5 + 12;

  // ==========================================
  // APPROVAL TIMELINE
  // ==========================================

  addSectionTitle("APPROVAL TIMELINE");

  const approvals = [
    {
      role: "Organizer",
      name: leave.organizer?.name,
      status: leave.organizerStatus,
      date: leave.organizerDecisionAt,
      remark: leave.organizerRemark,
    },
    {
      role: "Mentor",
      name: leave.mentor?.name,
      status: leave.mentorStatus,
      date: leave.mentorDecisionAt,
      remark: leave.mentorRemark,
    },
    {
      role: "HOD",
      name: leave.hod?.name,
      status: leave.hodStatus,
      date: leave.hodDecisionAt,
      remark: leave.hodRemark,
    },
  ];

  approvals.forEach((approval, index) => {

    checkPageSpace(34);

    doc.setFillColor(...lightColor);

    doc.roundedRect(
      margin,
      y,
      contentWidth,
      28,
      3,
      3,
      "F"
    );

    // Number circle
    doc.setFillColor(...successColor);

    doc.circle(
      margin + 7,
      y + 8,
      4,
      "F"
    );

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);

    doc.text(
      String(index + 1),
      margin + 7,
      y + 10.5,
      {
        align: "center",
      }
    );

    // Role
    doc.setTextColor(...darkColor);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);

    doc.text(
      `${approval.role} Approval`,
      margin + 15,
      y + 7
    );

    // Status
    doc.setTextColor(...successColor);
    doc.setFontSize(9);

    doc.text(
      approval.status || "Approved",
      pageWidth - margin - 5,
      y + 7,
      {
        align: "right",
      }
    );

    // Approved by
    doc.setTextColor(...mutedColor);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);

    doc.text(
      "Approved By",
      margin + 15,
      y + 14
    );

    doc.setTextColor(...darkColor);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);

    doc.text(
      approval.name || "-",
      margin + 40,
      y + 14
    );

    // Date
    doc.setTextColor(...mutedColor);
    doc.setFont("helvetica", "bold");

    doc.text(
      "Date",
      110,
      y + 14
    );

    doc.setTextColor(...darkColor);
    doc.setFont("helvetica", "normal");

    doc.text(
      formatDateTime(
        approval.date
      ),
      123,
      y + 14
    );

    // Remark
    doc.setTextColor(...mutedColor);
    doc.setFont("helvetica", "bold");

    doc.text(
      "Remark",
      margin + 15,
      y + 21
    );

    doc.setTextColor(...darkColor);
    doc.setFont("helvetica", "normal");

    const remarkLines =
      doc.splitTextToSize(
        approval.remark ||
          "No remark",
        125
      );

    doc.text(
      remarkLines.slice(0, 1),
      margin + 32,
      y + 21
    );

    y += 33;
  });

  // ==========================================
  // FINAL APPROVAL
  // ==========================================

  checkPageSpace(32);

  doc.setFillColor(...successColor);

  doc.roundedRect(
    margin,
    y,
    contentWidth,
    22,
    3,
    3,
    "F"
  );

  doc.setTextColor(255, 255, 255);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);

  doc.text(
    "FINAL APPROVAL: LEAVE APPROVED",
    pageWidth / 2,
    y + 9,
    {
      align: "center",
    }
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);

  doc.text(
    "Approved by Organizer, Mentor and HOD",
    pageWidth / 2,
    y + 16,
    {
      align: "center",
    }
  );

  y += 32;

  // ==========================================
  // SIGNATURE BOXES
  // ==========================================

  checkPageSpace(35);

  const boxGap = 5;
  const boxWidth =
    (contentWidth - boxGap * 2) / 3;

  doc.setTextColor(...darkColor);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);

  const boxes = [
    {
      x: margin,
      title: "Organizer",
    },
    {
      x: margin + boxWidth + boxGap,
      title: "Mentor",
    },
    {
      x:
        margin +
        (boxWidth + boxGap) * 2,
      title: "HOD",
    },
  ];

  boxes.forEach((box) => {

    doc.setDrawColor(...borderColor);

    doc.rect(
      box.x,
      y,
      boxWidth,
      25
    );

    doc.setTextColor(...darkColor);

    doc.text(
      box.title,
      box.x + boxWidth / 2,
      y + 8,
      {
        align: "center",
      }
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...mutedColor);

    doc.text(
      "Digitally Approved",
      box.x + boxWidth / 2,
      y + 18,
      {
        align: "center",
      }
    );

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
  });

  // ==========================================
  // FOOTER
  // ==========================================

  addFooter();

  // ==========================================
  // DOWNLOAD
  // ==========================================

  const safeEventName = (
    leave.eventName ||
    "Duty_Leave"
  )
    .replace(
      /[^a-z0-9]/gi,
      "_"
    )
    .replace(
      /_+/g,
      "_"
    );

  const enrollment =
    leave.student?.enrollmentNumber ||
    "Student";

  doc.save(
    `Duty_Leave_Certificate_${enrollment}_${safeEventName}.pdf`
  );
};

  return (
    <DashboardLayout>
      <ToastContainer />

      <div className="container-fluid">

            <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">
            Approved Leaves
          </h2>

          <p className="text-muted mb-0">
            Your fully approved duty leave records
          </p>
        </div>
      </div>

        {loading ? (

          <div className="card shadow border-0">
            <div className="card-body text-center py-5">
              <div className="spinner-border text-primary" />
              <p className="mt-3 mb-0">
                Loading approved leaves...
              </p>
            </div>
          </div>

        ) : leaves.length === 0 ? (

          <div className="card shadow border-0">
            <div className="card-body text-center py-5">

              <h5 className="text-muted">
                No Approved Leaves
              </h5>

              <p className="text-muted mb-0">
                Your fully approved duty leaves will appear here.
              </p>

            </div>
          </div>

        ) : (

          leaves.map((leave) => (

            <div
              className="card shadow border-0 mb-4"
              key={leave._id}
            >

              {/* Header */}

            <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">

                <div>
                  <h5 className="mb-1 fw-bold">
                    {leave.eventName}
                  </h5>

                  <small>
                    Duty Leave Approval
                  </small>
                </div>

                <div className="d-flex align-items-center gap-2">

                  <span className="badge bg-light text-success">
                    {leave.finalStatus}
                  </span>

                  <button
                    className="btn btn-light btn-sm fw-semibold"
                    onClick={() => downloadPDF(leave)}
                  >
                    <FaDownload className="me-2" />
                    Download PDF
                  </button>

                </div>

              </div>


              <div className="card-body">

                {/* Student Details */}

                <h5 className="fw-bold text-primary mb-3">
                  Student Details
                </h5>

                <div className="row">

                  <div className="col-md-4 mb-3">
                    <strong>Name</strong>
                    <div>
                      {leave.student?.name || "-"}
                    </div>
                  </div>

                  <div className="col-md-4 mb-3">
                    <strong>Enrollment Number</strong>
                    <div>
                      {leave.student?.enrollmentNumber || "-"}
                    </div>
                  </div>

                  <div className="col-md-4 mb-3">
                    <strong>Email</strong>
                    <div>
                      {leave.student?.email || "-"}
                    </div>
                  </div>

                  <div className="col-md-3 mb-3">
                    <strong>Course</strong>
                    <div>
                      {leave.student?.course || "-"}
                    </div>
                  </div>

                  <div className="col-md-3 mb-3">
                    <strong>Department</strong>
                    <div>
                      {leave.student?.department || "-"}
                    </div>
                  </div>

                  <div className="col-md-2 mb-3">
                    <strong>Year</strong>
                    <div>
                      {leave.student?.year || "-"}
                    </div>
                  </div>

                  <div className="col-md-2 mb-3">
                    <strong>Semester</strong>
                    <div>
                      {leave.student?.semester || "-"}
                    </div>
                  </div>

                  <div className="col-md-2 mb-3">
                    <strong>Section</strong>
                    <div>
                      {leave.student?.section || "-"}
                    </div>
                  </div>

                </div>

                <hr />


                {/* Event Details */}

                <h5 className="fw-bold text-primary mb-3">
                  Event Details
                </h5>

                <div className="row">

                  <div className="col-md-6 mb-3">
                    <strong>Event Name</strong>
                    <div>
                      {leave.event?.eventName ||
                        leave.eventName ||
                        "-"}
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <strong>Venue</strong>
                    <div>
                      {leave.event?.venue || "-"}
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <strong>Event Start</strong>
                    <div>
                      {formatDate(
                        leave.event?.startDate
                      )}
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <strong>Event End</strong>
                    <div>
                      {formatDate(
                        leave.event?.endDate
                      )}
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <strong>Organizer</strong>
                    <div>
                      {leave.organizer?.name ||
                        leave.organizerName ||
                        "-"}
                    </div>
                  </div>

                </div>

                <hr />


                {/* Leave Details */}

                <h5 className="fw-bold text-primary mb-3">
                  Leave Details
                </h5>

                <div className="row">

                  <div className="col-md-6 mb-3">
                    <strong>Leave From</strong>
                    <div>
                      {formatDate(leave.fromDate)}
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <strong>Leave To</strong>
                    <div>
                      {formatDate(leave.toDate)}
                    </div>
                  </div>

                  <div className="col-12 mb-3">
                    <strong>Reason</strong>
                    <div className="border rounded p-3 mt-1 bg-light">
                      {leave.reason || "-"}
                    </div>
                  </div>

                </div>

                <hr />


                {/* Approval Details */}

                <h5 className="fw-bold text-primary mb-3">
                  Approval Details
                </h5>

                <div className="row">

                  {/* Organizer */}

                  <div className="col-md-4 mb-3">

                    <div className="border rounded p-3 h-100">

                      <h6 className="fw-bold">
                        Organizer
                      </h6>

                      <span className="badge bg-success mb-2">
                        {leave.organizerStatus}
                      </span>

                      <p className="mb-1">
                        <strong>Approved By:</strong>
                      </p>

                      <p>
                        {leave.organizer?.name || "-"}
                      </p>

                      <p className="mb-1">
                        <strong>Approved On:</strong>
                      </p>

                      <p>
                        {formatDate(
                          leave.organizerDecisionAt
                        )}
                      </p>

                      <p className="mb-1">
                        <strong>Remark:</strong>
                      </p>

                      <p className="text-muted">
                        {leave.organizerRemark ||
                          "No remark"}
                      </p>

                    </div>

                  </div>


                  {/* Mentor */}

                  <div className="col-md-4 mb-3">

                    <div className="border rounded p-3 h-100">

                      <h6 className="fw-bold">
                        Mentor
                      </h6>

                      <span className="badge bg-success mb-2">
                        {leave.mentorStatus}
                      </span>

                      <p className="mb-1">
                        <strong>Approved By:</strong>
                      </p>

                      <p>
                        {leave.mentor?.name || "-"}
                      </p>

                      <p className="mb-1">
                        <strong>Approved On:</strong>
                      </p>

                      <p>
                        {formatDate(
                          leave.mentorDecisionAt
                        )}
                      </p>

                      <p className="mb-1">
                        <strong>Remark:</strong>
                      </p>

                      <p className="text-muted">
                        {leave.mentorRemark ||
                          "No remark"}
                      </p>

                    </div>

                  </div>


                  {/* HOD */}

                  <div className="col-md-4 mb-3">

                    <div className="border rounded p-3 h-100">

                      <h6 className="fw-bold">
                        HOD
                      </h6>

                      <span className="badge bg-success mb-2">
                        {leave.hodStatus}
                      </span>

                      <p className="mb-1">
                        <strong>Approved By:</strong>
                      </p>

                      <p>
                        {leave.hod?.name || "-"}
                      </p>

                      <p className="mb-1">
                        <strong>Approved On:</strong>
                      </p>

                      <p>
                        {formatDate(
                          leave.hodDecisionAt
                        )}
                      </p>

                      <p className="mb-1">
                        <strong>Remark:</strong>
                      </p>

                      <p className="text-muted">
                        {leave.hodRemark ||
                          "No remark"}
                      </p>

                    </div>

                  </div>

                </div>


                {/* Final Status */}

                <div className="alert alert-success mt-3 mb-0">

                  <strong>
                    Final Approval:
                  </strong>{" "}
                  Leave Approved by Organizer,
                  Mentor and HOD.

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </DashboardLayout>
  );
}

export default ApprovedLeave;