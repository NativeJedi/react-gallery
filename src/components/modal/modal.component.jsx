import React, { useEffect } from 'react';
import './modal.styles.scss';

const Modal = ({
  children,
  isOpened,
}) => {
  useEffect(() => {
    document.body.style.overflowY = isOpened ? 'hidden' : 'auto';
  }, [isOpened]);

  if (!isOpened) return null;

  return (
    <div className="modal">
      <div className="modal__window">
        {children}
      </div>
    </div>
  );
};

export default Modal;
