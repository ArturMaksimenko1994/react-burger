
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import ModalOverlay from "./../modal-overlay/modal-overlay"
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './modal.module.css';

const modalRoot = document.getElementById("modals");

const Modal = ({ children, title, active, setActive }) => {

  const handleClose = () => {
    setActive(false);
  };

  const handleEsc = (event) => {
    if (event.keyCode === 27) {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEsc, false);
    return () => {
      document.removeEventListener('keydown', handleEsc, false);
    };
  }, []);

  return createPortal(
    (
      <div className={`${styles['modal-block']} ${active ? styles.active : 'modal-block'}`} onClick={() => setActive(false)}>
        <div className={`${styles.modal} pt-10 pr-10 pb-10 pl-10`}>
          <div className={`${styles['modal-heading']} mb-9 `}>
            <p className="text text_type_main-large">{title}</p>
            <CloseIcon type="primary" onClick={() => setActive(false)} />
          </div>
          {children}
        </div>
        <ModalOverlay />
      </div>
    ),
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
};

export default Modal;