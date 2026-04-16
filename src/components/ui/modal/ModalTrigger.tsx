import type { ReactNode } from "react";

import { useModal } from "./Modal.tsx";
import Button from "../Button.tsx";
import type { TButtonVariant } from "../../../types/types.ts";

type ModalTriggerProps = {
    children: ReactNode;
    variant: TButtonVariant;
}

const ModalTrigger = ({ children, variant }: ModalTriggerProps) => {
    const { triggerModal } = useModal();

    return (
        <Button variant={variant} onClick={triggerModal}>
            {children}
        </Button>
    );
}

export default ModalTrigger;