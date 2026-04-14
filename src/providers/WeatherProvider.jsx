import { createContext, useContext, useEffect, useState } from 'react';
import { weatherApi } from "../api/api.js";

const WeatherContext = createContext(null);

const WeatherProvider = ({ children }) => {
    const [units, setUnits] = useState("metric");

    const [currentCity, setCurrentCity] = useState(null);

    const [currentWeather, setCurrentWeather] = useState(null);
    const [favoriteCities, setFavoriteCities] = useState([]);

    const [isWeatherLoading, setIsWeatherLoading] = useState(false);
    const [isForecastLoading, setIsForecastLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function handleAddFavoriteCity(newCity) {
        newCity.id = crypto.randomUUID();
        setFavoriteCities([...favoriteCities, newCity]);
    }

    function handleRemoveFavoriteCity(cityId) {
        setFavoriteCities(prev => prev.filter(city => city.id !== cityId));
    }

    function changeUnits(units) {
        setUnits(units);
    }

    function handleLocationCallback(pos) {
        const crd = pos.coords;

        setIsWeatherLoading(true);
        weatherApi.fetchReverseGeolocation({ lat: crd?.latitude, lon: crd?.longitude })
            .then(res => {
                setCurrentCity(res?.[0]);
                setIsWeatherLoading(false);
            });
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(handleLocationCallback);
    }, []);

    useEffect(() => {
        if (currentCity) {
            const query = `${currentCity?.name},${currentCity?.country}`;

            setIsWeatherLoading(true);
            weatherApi.fetchWeather(query, units)
                .then(res => {
                    setCurrentWeather(res);
                    setIsWeatherLoading(false);
                })
        }
    }, [currentCity, units]);

    return (
        <WeatherContext.Provider value={{
            changeUnits,
            handleAddFavoriteCity,
            handleRemoveFavoriteCity,
            currentCity,
            isLoading,
            setIsLoading,
            isWeatherLoading,
            isForecastLoading,
            setIsForecastLoading,
            currentWeather,
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
