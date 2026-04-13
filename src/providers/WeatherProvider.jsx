import { createContext, useContext, useState } from 'react'

const WeatherContext = createContext(null);

const WeatherProvider = ({ children }) => {
    const [units, setUnits] = useState("metric");

    const [selectedCity, setSelectedCity] = useState("");
    const [favoriteCities, setFavoriteCities] = useState([]);

    function handleAddToFavorite(newCity) {
        newCity.id = crypto.randomUUID();
        setFavoriteCities([...favoriteCities, newCity]);
    }

    function handleRemoveFromFavorite(cityId) {
        setFavoriteCities(prev => prev.filter(city => city.id !== cityId));
    }

    function changeToFahrenheit() {
        setUnits("imperial");
    }

    function changeToCelsius() {
        setUnits("metric");
    }

    return (
        <WeatherContext.Provider value={{
            changeToCelsius,
            changeToFahrenheit,
            handleAddToFavorite,
            handleRemoveFromFavorite,
            favoriteCities,
            units,
            selectedCity,
            setSelectedCity
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
