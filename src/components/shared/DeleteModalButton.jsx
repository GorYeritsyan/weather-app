import Modal from "../ui/modal/Modal.jsx";
import ModalTrigger from "../ui/modal/ModalTrigger.jsx";
import ModalContent from "../ui/modal/ModalContent.jsx";
import ModalSubmit from "../ui/modal/ModalSubmit.jsx";
import ModalClose from "../ui/modal/ModalClose.jsx";

const DeleteModalButton = ({ title, description, onDelete }) => {
    return (
        <Modal>
            <ModalTrigger variant="danger">
                Remove
            </ModalTrigger>
            <ModalContent title={title} description={description}>
                <ModalSubmit onSubmit={onDelete} variant="danger">
                    Yes, I'm sure
                </ModalSubmit>

                <ModalClose variant="ghost">
                    Close
                </ModalClose>
            </ModalContent>
        </Modal>
    );
}

export default DeleteModalButton;