import { createPortal } from "react-dom";

const ModalPortal = ({ children, modalRef }) => {
  const modalRoot = document.getElementById("modal-root");
  return createPortal(children, modalRoot, modalRef);
};

export default ModalPortal;