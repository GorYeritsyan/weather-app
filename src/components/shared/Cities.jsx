import { useNavigate } from "react-router";
import { useWeather } from "../../providers/WeatherProvider.jsx";

import { cn } from "../../utils/index.js";
import DeleteModalButton from "./DeleteModalButton.jsx";

const Cities = ({ cities }) => {
    const navigate = useNavigate();
    const { handleRemoveFavoriteCity } = useWeather();

    function navigateToFavoriteCity(city) {
        navigate(`/favorites/${city.country}/${city.name}`);
    }

    return (
       <div className="flex flex-col gap-4">
           {cities?.length > 0 ? cities?.map(city => (
               <div key={city.lon} className="flex items-center gap-2">
                   <div
                       onClick={() => navigateToFavoriteCity(city)}
                       className={cn("rounded-full text-lg px-5 py-2 font-semibold bg-blue-100 cursor-pointer flex items-center justify-center gap-3 hover:bg-blue-200")}
                   >
                       <span>
                           {city?.name}, {city?.country}
                       </span>
                   </div>

                   <DeleteModalButton
                       title="Delete City"
                       description="Are you sure you want to delete this city?"
                       onDelete={() => handleRemoveFavoriteCity(city?.id)}
                   />
               </div>
           )) : (
               <p className="text-gray-500 font-semibold text-center">There is no favorite cities</p>
           )}
       </div>
    )
}
export default Cities
