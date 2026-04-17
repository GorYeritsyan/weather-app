import type { ReactNode } from "react";
import { createPortal } from "react-dom";

import { useModal } from "./Modal";

type ModalContentProps = {
    children: ReactNode;
    title: string;
    description: string;
}

const ModalContent = ({ children, title, description }: ModalContentProps) => {
    const { isModalOpen, closeModal } = useModal();

    function handleCloseModal(e: any) {
        if (e.target.id === "modal") {
            closeModal();
        }
    }

    if (!isModalOpen) return;

    return (
        createPortal((
            <div id="modal" onClick={handleCloseModal} className="fixed top-0 left-0 size-full bg-gray-500/50 flex items-center justify-center">
                <div className="bg-white border-gray-300 shadow-sm shadow-gray-300 px-5 py-4 rounded-lg flex flex-col gap-4 justify-between min-w-95 min-h-35">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-2xl font-semibold">{title}</h3>
                        <p className="font-medium">{description}</p>
                    </div>

                    <div className="flex items-center gap-2 self-end">
                        {children}
                    </div>
                </div>
            </div>
        ), document.body)
    );
}

export default ModalContent;