import { Modal } from "@mui/material";

export default function ModalNonClosable({ open, children }) {
  return (
    <Modal open={open}>
      <div className="position-absolute top-50 start-50 translate-middle col-4 cbg-white rounded p-3">
        {children}
      </div>
    </Modal>
  );
}
