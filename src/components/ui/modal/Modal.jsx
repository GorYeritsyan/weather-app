import {createContext, useContext, useState} from "react";

const ModalContext = createContext(null);

const Modal = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

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