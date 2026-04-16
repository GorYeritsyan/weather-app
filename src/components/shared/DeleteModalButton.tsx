import Modal from "../ui/modal/Modal.tsx";
import ModalTrigger from "../ui/modal/ModalTrigger.tsx";
import ModalContent from "../ui/modal/ModalContent.tsx";
import ModalSubmit from "../ui/modal/ModalSubmit.tsx";
import ModalClose from "../ui/modal/ModalClose.tsx";

type DeleteModalButtonProps = {
    title: string;
    description: string;
    onDelete: () => void;
}

const DeleteModalButton = ({ title, description, onDelete }: DeleteModalButtonProps) => {
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