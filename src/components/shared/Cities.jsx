import { useNavigate } from "react-router";
import { FaLocationDot } from "react-icons/fa6";

import { useWeather } from "../../providers/WeatherProvider.jsx";
import { cn } from "../../utils/index.js";
import DeleteModalButton from "./DeleteModalButton.jsx";

const Cities = ({ cities }) => {
    const navigate = useNavigate();
    const { handleSelectFavoriteCity, handleRemoveFromFavorite, currentCity, selectedCity } = useWeather();

    function selectFavoriteCity(city) {
        handleSelectFavoriteCity(city);
        navigate("/");
    }

    function removeFavoriteCity(city) {
        handleRemoveFromFavorite(city.id);

        handleSelectFavoriteCity(currentCity);
    }

    return (
       <div className="flex flex-col gap-4">
           {cities?.map(city => (
               <div key={city.lon} className="flex items-center gap-2">
                   <div
                       onClick={() => selectFavoriteCity(city)}
                       className={cn("rounded-full text-lg px-5 py-2 font-semibold bg-blue-100 cursor-pointer flex items-center justify-center gap-3 hover:bg-blue-200")}
                   >
                       <span>
                           {city?.name}, {city?.country}
                       </span>
                   </div>

                   <DeleteModalButton
                       title="Delete City"
                       description="Are you sure you want to delete this city?"
                       onDelete={() => removeFavoriteCity(city)}
                   />
               </div>
           ))}
       </div>
    )
}
export default Cities
