import styles from './modal-overlay.module.css';
import {FC} from "react";
import {TModalOverlay} from '../../../services/types/data';

const ModalOverlay: FC<TModalOverlay>  = ({onClickClose}) => {
  return (
    <div className={styles.overlay} onClick={onClickClose}></div>
  );
}

export default ModalOverlay;