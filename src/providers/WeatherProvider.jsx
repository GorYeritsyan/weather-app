import { createContext, useContext, useEffect, useState } from 'react';
import { weatherApi } from "../api/api.js";

const WeatherContext = createContext(null);

const WeatherProvider = ({ children }) => {
    const [units, setUnits] = useState("metric");

    const [currentCity, setCurrentCity] = useState(null);
    const [coordinates, setCoordinates] = useState(null);
    const [currentWeather, setCurrentWeather] = useState(null);

    const [favoriteCities, setFavoriteCities] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    function handleAddToFavorite(newCity) {
        newCity.id = crypto.randomUUID();
        setFavoriteCities([...favoriteCities, { ...newCity, isSelected: false }]);
    }

    function handleRemoveFromFavorite(cityId) {
        setFavoriteCities(prev => prev.filter(city => city.id !== cityId));
    }

    function handleSelectFavoriteCity(selectedCity) {
        setFavoriteCities(prev => prev.map(city => city.id === selectedCity.id ? { ...city, isSelected: true } : { ...city, isSelected: false }))
        setCoordinates({ lat: selectedCity?.lat, lon: selectedCity?.lon });
    }

    function changeToFahrenheit() {
        setUnits("imperial");
    }

    function changeToCelsius() {
        setUnits("metric");
    }

    function handleLocationCallback(pos) {
        const crd = pos.coords;
        setCoordinates({ lat: crd?.latitude, lon: crd?.longitude });

        setIsLoading(true);
        weatherApi.fetchWeather(`weather?lat=${crd?.latitude}&lon=${crd?.longitude}&units=${units}`).then(res => {
            const id = crypto.randomUUID();
            setCurrentCity({ id, name: res?.name, country: res?.sys?.country, lat: res?.coord?.lat, lon: res?.coord?.lon });
            setIsLoading(false);
        })
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(handleLocationCallback);
    }, []);

    useEffect(() => {
        if (currentCity) {
            setFavoriteCities(prev => [...prev, { ...currentCity, isSelected: true }]);
        }
    }, [currentCity]);

    useEffect(() => {
        if (coordinates) {
            setIsLoading(true);
            weatherApi.fetchWeather(`weather?lat=${coordinates?.lat}&lon=${coordinates?.lon}&units=${units}`)
                .then(res => {
                    setCurrentWeather(res);
                    setIsLoading(false);
                });
        }
    }, [coordinates, units]);

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
            coordinates,
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
