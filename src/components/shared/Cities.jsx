import { useWeather } from "../../providers/WeatherProvider.jsx";
import { cn } from "../../utils/index.js";
import Modal from "../ui/modal/Modal.jsx";
import ModalTrigger from "../ui/modal/ModalTrigger.jsx";
import ModalContent from "../ui/modal/ModalContent.jsx";
import DeleteModalButton from "./DeleteModalButton.jsx";

const Cities = ({ cities }) => {
    const { selectedCity, setSelectedCity, handleRemoveFromFavorite } = useWeather();

    return (
       <div className="flex flex-col gap-4">
           {cities?.map(city => (
               <div key={city.id} className="flex items-center gap-2">
                   <div
                       onClick={() => setSelectedCity(city)}
                       className={cn("rounded-full text-lg px-5 py-2 font-semibold bg-blue-100 cursor-pointer", selectedCity === city && "bg-blue-500 text-white")}
                   >
                       {city?.name}, {city?.country}
                   </div>

                   <DeleteModalButton
                       title="Delete City"
                       description="Are you sure you want to delete this city?"
                       onDelete={() => handleRemoveFromFavorite(city.id)}
                   />
               </div>
           ))}
       </div>
    )
}
export default Cities
