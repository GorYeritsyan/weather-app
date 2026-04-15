import { createContext, useContext, useEffect, useState } from 'react';
import { weatherApi } from "../api/api.js";

const WeatherContext = createContext(null);

const WeatherProvider = ({ children }) => {
    const [isLocationLoading, setIsLocationLoading] = useState(false);
    const [units, setUnits] = useState("metric");
    const [currentCity, setCurrentCity] = useState(null);

    // Favorite Cities List
    const [favoriteCities, setFavoriteCities] = useState([]);

    // Add Favorite City
    function handleAddFavoriteCity(newCity) {
        newCity.id = crypto.randomUUID();
        setFavoriteCities([...favoriteCities, newCity]);
    }

    // Remove Favorite City
    function handleRemoveFavoriteCity(cityId) {
        setFavoriteCities(prev => prev.filter(city => city.id !== cityId));
    }

    // Change weather details units - Celsius, Fahrenheit
    function changeUnits(units) {
        setUnits(units);
    }

    // Get Location and fetch current city details to later fetch current weather and forecast using city name
    function handleLocationCallback(pos) {
        const crd = pos.coords;

        weatherApi.fetchReverseGeolocation({ lat: crd?.latitude, lon: crd?.longitude })
            .then(res => {
                setCurrentCity(res?.[0]);
                setIsLocationLoading(false);
            });
    }

    // Get current position - latitude, longitude
    useEffect(() => {
        setIsLocationLoading(true);
        navigator.geolocation.getCurrentPosition(handleLocationCallback);
    }, []);

    return (
        <WeatherContext.Provider value={{
            changeUnits,
            handleAddFavoriteCity,
            handleRemoveFavoriteCity,
            currentCity,
            isLocationLoading,
            favoriteCities,
            units,
        }}
        >
            {children}
        </WeatherContext.Provider>
    )
}

export const useWeather = () => {
    const context = useContext(WeatherContext);

    if (!context) throw new Error('useWeather must be used within WeatherProvider')

    return context;
}

export default WeatherProvider
