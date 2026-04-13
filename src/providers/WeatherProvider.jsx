import { createContext, useContext, useEffect, useState } from 'react';
import { weatherApi } from "../api/api.js";

const WeatherContext = createContext(null);

const WeatherProvider = ({ children }) => {
    const [units, setUnits] = useState("metric");

    const [currentCity, setCurrentCity] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    const [currentWeather, setCurrentWeather] = useState(null);

    const [favoriteCities, setFavoriteCities] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    function handleAddToFavorite(newCity) {
        newCity.id = crypto.randomUUID();
        setFavoriteCities([...favoriteCities, newCity]);
    }

    function handleRemoveFromFavorite(cityId) {
        setFavoriteCities(prev => prev.filter(city => city.id !== cityId));
    }

    function handleSelectFavoriteCity(selectedCity) {
        setSelectedCity(selectedCity);
    }

    function changeToFahrenheit() {
        setUnits("imperial");
    }

    function changeToCelsius() {
        setUnits("metric");
    }

    function handleLocationCallback(pos) {
        const crd = pos.coords;

        setIsLoading(true);
        weatherApi.fetchGeolocations({ lat: crd?.latitude, lon: crd?.longitude, endpoint: "reverse" })
            .then(res => {
                setCurrentCity(res?.[0]);
                setIsLoading(false);
            });
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(handleLocationCallback);
    }, []);

    // Add current city to favorite cities list
    useEffect(() => {
        if (currentCity) {
            setFavoriteCities(prev => [...prev, { ...currentCity }]);
        }
    }, [currentCity]);

    useEffect(() => {
        const query = selectedCity ? `${selectedCity?.name},${selectedCity?.country}` : `${currentCity?.name},${currentCity?.country}`;

        if (query) {
            setIsLoading(true);
            weatherApi.fetchWeather(`weather?q=${query}&units=${units}`)
                .then(res => {
                    setCurrentWeather(res);
                    setIsLoading(false);
                });
        }
    }, [currentCity, selectedCity, units]);

    return (
        <WeatherContext.Provider value={{
            changeToCelsius,
            changeToFahrenheit,
            handleAddToFavorite,
            handleRemoveFromFavorite,
            currentCity,
            isLoading,
            setIsLoading,
            currentWeather,
            selectedCity,
            favoriteCities,
            units,
            handleSelectFavoriteCity
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
