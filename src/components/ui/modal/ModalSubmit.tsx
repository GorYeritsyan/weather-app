import type { ReactNode } from "react";
import { useModal } from "./Modal.tsx";
import Button from "../Button.tsx";
import type { TButtonVariant } from "../../../types/types.ts";

type ModalSubmit = {
    children: ReactNode;
    onSubmit: () => void;
    variant: TButtonVariant;
}

const ModalSubmit = ({ children, onSubmit, variant }: ModalSubmit) => {
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