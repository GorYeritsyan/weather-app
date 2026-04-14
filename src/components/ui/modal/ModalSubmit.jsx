import { useModal } from "./Modal.jsx";
import Button from "../Button.jsx";

const ModalSubmit = ({ children, onSubmit, variant }) => {
    const { closeModal } = useModal();

    function handleSubmit() {
        onSubmit();
        closeModal();
    }

    return (
        <Button
            onClick={handleSubmit}
            variant={variant}
        >
            {children}
        </Button>
    );
}

export default ModalSubmit;