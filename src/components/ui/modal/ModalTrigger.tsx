import type { ReactNode } from "react";

import { useModal } from "./Modal";
import Button from "../Button";
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