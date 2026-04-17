import { useNavigate } from "react-router";
import { useWeather } from "../../providers/WeatherProvider";

import DeleteModalButton from "./DeleteModalButton";

import { cn } from "../../utils";
import type { TCity } from "../../types/types.ts";

const Cities = () => {
    const navigate = useNavigate();
    const { handleRemoveFavoriteCity, favoriteCities } = useWeather();

    function navigateToFavoriteCity(city: TCity) {
        navigate(`/favorites/${city.country}/${city.name}`);
    }

    return (
       <div className="flex flex-col gap-4">
           {favoriteCities?.length > 0 ? favoriteCities?.map(city => (
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
