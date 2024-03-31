
import styles from './modal-overlay.module.css';

const ModalOverlay = ({onClickClose}) => {
  return (
    <div className={styles.overlay} onClick={onClickClose}></div>
  );
}

export default ModalOverlay;