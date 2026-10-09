import Modal from "@/components/common/Modal";

const ConfirmDialog = ({
  title,
  message,
  confirmLabel = "Confirm",
  danger = false,
  loading = false,
  onConfirm,
  onCancel,
}) => (
  <Modal title={title} onClose={onCancel} size="max-w-md">
    <p className="text-sm text-muted">{message}</p>
    <div className="mt-6 flex justify-end gap-3">
      <button type="button" className="btn btn-outline" onClick={onCancel} disabled={loading}>
        Cancel
      </button>
      <button
        type="button"
        className={`btn ${danger ? "btn-danger" : "btn-primary"}`}
        onClick={onConfirm}
        disabled={loading}
      >
        {loading ? "Please wait..." : confirmLabel}
      </button>
    </div>
  </Modal>
);

export default ConfirmDialog;
