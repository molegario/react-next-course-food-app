import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = forwardRef(({
  onClose,
  children
}, ref) => {
  const innerRef = useRef();

  useImperativeHandle(
    ref,
    () => ({
      open: () => {
        innerRef.current.showModal();
      },
      close: () => {
        innerRef.current.close();
      }
    }),
  );

  return createPortal(
    <dialog className="modal" onClose={onClose} ref={innerRef}>{children}</dialog>,
    document.getElementById("modal")
  );
});

export default Modal;