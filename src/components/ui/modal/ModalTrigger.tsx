import { useModal } from "./Modal.tsx";
import Button from "../Button.tsx";

const ModalTrigger = ({ children, variant }) => {
    const { triggerModal } = useModal();

    return (
        <Button variant={variant} onClick={triggerModal}>
            {children}
        </Button>
    );
}

export default ModalTrigger;