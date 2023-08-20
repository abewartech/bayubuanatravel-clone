import Modal from "react-modal";
import styles from "./Modal.module.scss";
export default function ModalComponent(props) {
  const { content, title, action, open, close } = props;
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      zIndex: 1000,
      transform: "translate(-50%, -50%)",
    },
  };
  return (
    <Modal
      isOpen={open}
      onRequestClose={close}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.content}>{content}</div>
      {action && <div className={styles.action}>{action}</div>}
    </Modal>
  );
}
