import { useModal } from "./Modal.jsx";

const ModalContent = ({ children, title, description }) => {
    const { isModalOpen, closeModal } = useModal();

    function handleCloseModal(e) {
        if (e.target.id === "modal") {
            closeModal();
        }
    }

    if (!isModalOpen) return;

    return (
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
    );
}

export default ModalContent;