import { useModal } from "./Modal.jsx";
import Button from "../Button.jsx";

const ModalTrigger = ({ children, variant }) => {
    const { triggerModal } = useModal();

    return (
        <Button variant={variant} onClick={triggerModal}>
            {children}
        </Button>
    );
}

export default ModalTrigger;