import { useModal } from "./Modal.tsx";
import Button from "../Button.tsx";

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