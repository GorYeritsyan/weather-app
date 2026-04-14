import { useModal } from "./Modal.jsx";
import Button from "../Button.jsx";

const ModalClose = ({ children, variant }) => {
    const { closeModal } = useModal();

    return (
        <Button onClick={closeModal} variant={variant}>
            {children}
        </Button>
    );
}

export default ModalClose;