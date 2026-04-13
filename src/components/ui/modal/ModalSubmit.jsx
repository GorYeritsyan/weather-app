import {cn} from "../../../utils/index.js";
import {useModal} from "./Modal.jsx";

const ModalSubmit = ({ children, onSubmit, className }) => {
    const { closeModal } = useModal();

    function handleSubmit() {
        onSubmit();
        closeModal();
    }

    return (
        <button
            onClick={handleSubmit}
            className={cn("font-semibold text-blue-500 hover:text-blue-600 active:bg-blue-200 cursor-pointer hover:bg-blue-100 px-3 py-1 rounded-full", className)}
        >
            {children}
        </button>
    );
}

export default ModalSubmit;