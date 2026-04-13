import Modal from "../ui/modal/Modal.jsx";
import ModalTrigger from "../ui/modal/ModalTrigger.jsx";
import ModalContent from "../ui/modal/ModalContent.jsx";
import ModalSubmit from "../ui/modal/ModalSubmit.jsx";
import ModalClose from "../ui/modal/ModalClose.jsx";

const DeleteModalButton = ({ title, description, onDelete }) => {
    return (
        <Modal>
            <ModalTrigger className="text-red-500 hover:text-red-600 active:bg-red-200 hover:bg-red-100">
                Remove
            </ModalTrigger>
            <ModalContent title={title} description={description}>
                <ModalSubmit onSubmit={onDelete} className="text-red-500 hover:text-red-600 active:bg-red-200 hover:bg-red-100">
                    Yes, I'm sure
                </ModalSubmit>

                <ModalClose className="text-gray-500 hover:text-gray-600 active:bg-gray-200 hover:bg-gray-100">
                    Close
                </ModalClose>
            </ModalContent>
        </Modal>
    );
}

export default DeleteModalButton;