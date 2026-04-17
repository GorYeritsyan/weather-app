import { useWeather } from "../../../providers/WeatherProvider";
import Spinner from "../../ui/Spinner";
import type { TCity } from "../../../types/types.ts";

type SearchMenuProps = {
    isSearching?: boolean;
    searchedCities: TCity[];
    onInputClear: () => void;
}

const SearchMenu = ({ isSearching, searchedCities, onInputClear }: SearchMenuProps) => {
    const { handleAddFavoriteCity } = useWeather();

    function addFavoriteCity(city: TCity) {
        handleAddFavoriteCity(city);
        onInputClear();
    }

    return (
        <div className="absolute top-full mt-1 bg-white rounded-xl border-gray-200 shadow-md shadow-gray-200 w-full h-fit">
            {isSearching ? (
                <div className="px-4 py-3 font-medium">
                    <Spinner className="size-8" />
                </div>
            ) : (
                searchedCities.length > 0 ? (
                    searchedCities.map((city) => (
                        <div key={city.lon} className="flex items-center justify-between px-4 font-semibold py-3 border-b border-gray-100 last:border-none">
                            <div className="flex flex-col gap-1">
                                <span>
                                    {city.name}, {city.country}
                                </span>

                                <span className="text-sm text-gray-500">
                                    {city.lon.toFixed(2)}, {city.lat.toFixed(2)}
                                </span>
                            </div>

                            <button
                                onClick={() => addFavoriteCity(city)}
                                className="text-blue-500 cursor-pointer hover:text-blue-600 px-3 py-1 active:bg-blue-200 hover:bg-blue-100 rounded-full"
                            >
                                Add to favorites
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="px-4 py-3 flex items-center justify-center font-medium">
                        <p className="">No results</p>
                    </div>
                )
            )}
        </div>
    )
}

export default SearchMenu;