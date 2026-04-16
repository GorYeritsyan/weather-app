import type { ReactNode } from "react";

import { useModal } from "./Modal.tsx";
import Button from "../Button.tsx";

import type { TButtonVariant } from "../../../types/types.ts";

type ModalCloseProps = {
    children: ReactNode;
    variant: TButtonVariant;
}

const ModalClose = ({ children, variant }: ModalCloseProps) => {
    const { closeModal } = useModal();

    return (
        <Button onClick={closeModal} variant={variant}>
            {children}
        </Button>
    );
}

export default ModalClose;