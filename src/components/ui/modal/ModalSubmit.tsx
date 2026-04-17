import type { ReactNode } from "react";
import { useModal } from "./Modal";
import Button from "../Button";
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