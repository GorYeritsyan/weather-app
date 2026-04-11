import { useRef, useState } from "react";

const SearchInput = ({ favoriteCities, onAddToFavorite }) => {

    const inputRef = useRef(null);
    const timeoutRef = useRef(null);

    const [searchedCities, setSearchedCities] = useState([]);

    // Filter cities to not add same city to favorites if already added
    const filteredCities = searchedCities?.length > 0 ? searchedCities?.filter(city => !favoriteCities.includes(city)): [];

    // Fetch cities
    function searchCities(cityName) {
        fetch(`${import.meta.env.VITE_GEOCODING_BASE_URL}/direct?q=${cityName}&limit=10&appid=${import.meta.env.VITE_API_KEY}`)
            .then(res => res.json())
            .then(cities => setSearchedCities(cities));
    }

    console.log("searchCities", searchedCities);

    // Search for cities using debounce
    function handleSearch() {
        if (timeoutRef?.current) {
            clearTimeout(timeoutRef?.current);
        }

        timeoutRef.current = setTimeout(() => {
            console.log(inputRef.current.value);
            searchCities(inputRef.current.value);
        }, 1000);
    }

    // Reset Search
    function resetSearch() {
        if (inputRef.current?.value) {
            inputRef.current.value = "";
            setSearchedCities([]);
        }
    }

    return (
        <div className="flex items-center gap-3">
            <div className="relative w-fit">
                <input
                    ref={inputRef}
                    onChange={handleSearch}
                    placeholder="Search for cities..."
                    className="rounded-full px-4 py-2 outline-none focus:ring-4 focus:ring-blue-200 duration-200 border border-blue-500 min-w-100"
                />

                {inputRef.current?.value && (
                    <div className="absolute top-full mt-1 bg-white rounded-xl border-gray-200 shadow-md shadow-gray-200 w-full h-fit">
                        {filteredCities.length > 0 ? (
                            filteredCities.map((city, index) => (
                                <div key={index} className="flex items-center justify-between px-4 font-semibold py-3 border-b border-gray-100 last:border-none">

                                    <span>
                                        {city.name}, {city.country}
                                    </span>

                                    <button
                                        onClick={() => onAddToFavorite(city)}
                                        className="text-blue-500 cursor-pointer hover:text-blue-600 px-3 py-1 active:bg-blue-200 hover:bg-blue-100 rounded-full"
                                    >
                                        Add to favorite
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-3 flex items-center justify-center font-medium">
                                <p className="">No results</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <button onClick={resetSearch} className="text-blue-500 hover:text-blue-600 font-semibold cursor-pointer">Reset</button>
        </div>
    )
}
export default SearchInput
