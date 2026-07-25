function RemarkModal({
  show,
  title,
  remark,
  setRemark,
  onClose,
  onSubmit,
}) {
  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        className="bg-white rounded shadow"
        style={{
          width: "450px",
          maxWidth: "90%",
        }}
      >
        <div className="border-bottom p-3">
          <h5 className="mb-0">{title}</h5>
        </div>

        <div className="p-3">
          <label className="form-label">
            Rejection Remark
          </label>

          <textarea
            rows={4}
            className="form-control"
            value={remark}
            onChange={(e) =>
              setRemark(e.target.value)
            }
          />
        </div>

        <div className="border-top p-3 text-end">

          <button
            className="btn btn-secondary me-2"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="btn btn-danger"
            onClick={onSubmit}
          >
            Reject
          </button>

        </div>
      </div>
    </div>
  );
}

export default RemarkModal;