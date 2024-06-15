import {FC, useEffect} from 'react';
import { createPortal } from 'react-dom';

import ModalOverlay from "./modal-overlay/modal-overlay"
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './modal.module.css';
import {TModal} from '../../services/types/data';
import {useSelector} from "../../services/hooks";

const modalRoot = document.getElementById("modals") as HTMLElement;

const Modal: FC<TModal> = ({ children, title, onClickClose}) => {

  useEffect(() => {
    function handleEscClose(evt: {key: string}) {
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
      ), modalRoot);

}

export default Modal;