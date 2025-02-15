import Modal from "react-modal";
import s from "./ImageModal.module.css";
Modal.setAppElement("#root");

interface ImageModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  image: string;
  alt: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ modalIsOpen, closeModal, image, alt }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "0",
      background: "transparent",
      border: "none",
    },
    overlay: {
      backgroundColor: "rgb(39, 42, 40, 0.7)",
    },
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <img src={image} alt={alt} />
      <p className={s.description}>{alt}</p>
    </Modal>
  );
};

export default ImageModal;
