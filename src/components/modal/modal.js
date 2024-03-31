
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import ModalOverlay from "./../modal-overlay/modal-overlay"
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './modal.module.css';

const modalRoot = document.getElementById("modals");

const Modal = ({ children, title, onClickClose}) => {

  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        onClickClose();
      }
    }
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [])

  return createPortal(
    (
      <div className={`${styles['modal-block']}`}>
        <div className={`${styles.modal} pt-10 pr-10 pb-10 pl-10`}>
          <div className={`${styles['modal-heading']} mb-9 `}>
            <p className="text text_type_main-large">{title}</p>
            <CloseIcon type="primary" onClick={onClickClose} />
          </div>
          {children}
        </div>
        <ModalOverlay onClickClose={onClickClose}/>
      </div>
    ),
    modalRoot
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  onClickClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default Modal;