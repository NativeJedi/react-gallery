import React from 'react';
import PropTypes from 'prop-types';
import './modal.styles.scss';

const Modal = ({
  children,
  onNext,
  onPrev,
  onClose,
}) => (
  <div className="modal">
    <div className="modal__window">
      <button
        type="button"
        className="btn-default modal__close"
        onClick={onClose}
      >
        &#10005;
      </button>

      <button
        type="button"
        className="btn-default modal__control modal__control--prev"
        onClick={onPrev}
      >
        &#10094;
      </button>
      <div className="modal__text">
        {children}
      </div>
      <button
        type="button"
        className="btn-default modal__control modal__control--next"
        onClick={onNext}
      >
        &#10095;
      </button>
    </div>
  </div>
);

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
