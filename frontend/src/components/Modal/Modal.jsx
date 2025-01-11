import ModalPortal from "./ModalPortal";
import "./Modal.css";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useRef } from "react";

const Modal = ({ content, buttonText, onClose, isOpen}) => {
  const modalRef = useRef(null);
  useOutsideClick(modalRef, onClose);

  if (!isOpen) return null;

  return (
    <ModalPortal modalRef={modalRef}>
      <div className="modal">
        <div className="modalContent">
          <button className="closeButton" onClick={onClose}>&times;</button>
          <div className="modalBody">{content}</div>
          <button className="modalButton">{buttonText}</button>
        </div>
      </div>
    </ModalPortal>
  )
}

export default Modal;