import { createContext, type ReactNode, useContext, useState } from "react";

type TModalContext = {
    isModalOpen: boolean;
    triggerModal: () => void;
    closeModal: () => void;
}

const ModalContext = createContext<TModalContext | null>(null);

const Modal = ({ children }: { children: ReactNode }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    function triggerModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    return (
        <ModalContext.Provider value={{
            isModalOpen,
            triggerModal,
            closeModal,
        }}>
            {children}
        </ModalContext.Provider>
    );
}

export const useModal = () => {
    const context = useContext(ModalContext);

    if (!context) throw new Error("useModal must be used within Modal");

    return context;
}

export default Modal;