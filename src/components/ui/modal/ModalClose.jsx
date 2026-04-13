import {useModal} from "./Modal.jsx";
import {cn} from "../../../utils/index.js";

const ModalClose = ({ children, className }) => {
    const { closeModal } = useModal();

    return (
        <button onClick={closeModal} className={cn("font-semibold text-blue-500 hover:text-blue-600 active:bg-blue-200 cursor-pointer hover:bg-blue-100 px-3 py-1 rounded-full", className)}>
            {children}
        </button>
    );
}

export default ModalClose;