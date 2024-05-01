
import styles from './modal-overlay.module.css';
import PropTypes from "prop-types";

const ModalOverlay = ({onClickClose}) => {
  return (
    <div className={styles.overlay} onClick={onClickClose}></div>
  );
}

ModalOverlay.propTypes = {
  onClickClose: PropTypes.func.isRequired
}

export default ModalOverlay;