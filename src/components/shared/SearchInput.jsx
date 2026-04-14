import { useRef, useState } from "react";
import { useWeather } from "../../providers/WeatherProvider.jsx";
import SearchMenu from "./SearchMenu.jsx";
import { weatherApi } from "../../api/api.js";

const SearchInput = () => {
    const { favoriteCities } = useWeather();
    const [isSearching, setIsSearching] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const inputRef = useRef(null);
    const timeoutRef = useRef(null);

    const [searchedCities, setSearchedCities] = useState([]);

    // Don't show same city in the search result if already city added to favorites
    const filteredCities = searchedCities?.length > 0 ? (
        searchedCities?.filter(city => !favoriteCities?.map(elem => elem?.lon).includes(city?.lon))
    ) : [];

    // Fetch cities
    function searchCities(cityName) {
        setIsSearching(true);
        setIsOpen(true);

        // Fetch geolocation
        weatherApi.fetchDirectGeolocation(cityName)
            .then(cities => {
                setSearchedCities(cities);
                setIsSearching(false);
            })
    }

    function handleToggleSearchMenu() {
        setIsOpen(!isOpen);
    }

    // Search for cities using debounce
    function handleSearch() {
        if (timeoutRef?.current) {
            clearTimeout(timeoutRef?.current);
        }

        timeoutRef.current = setTimeout(() => {
            searchCities(inputRef.current.value);
        }, 1000);
    }

    return (
        <div onClick={handleToggleSearchMenu} className="relative w-fit">
            <input
                ref={inputRef}
                onChange={handleSearch}
                placeholder="Search for cities..."
                className="rounded-full px-4 py-2 outline-none focus:ring-4 focus:ring-blue-200 duration-200 border border-blue-500 min-w-100"
            />

            {inputRef.current?.value && isOpen && (
                <SearchMenu isSearching={isSearching} searchedCities={filteredCities} />
            )}
        </div>
    )
}
export default SearchInput
