import { useModal } from "./Modal.tsx";
import Button from "../Button.tsx";

const ModalClose = ({ children, variant }) => {
    const { closeModal } = useModal();

    return (
        <Button onClick={closeModal} variant={variant}>
            {children}
        </Button>
    );
}

export default ModalClose;