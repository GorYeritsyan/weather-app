import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';
import { type TCity, type TUnits } from "../types/types.ts";
import { weatherApi } from "../api/api.ts";

type TWeatherContext = {
    changeUnits: (units: TUnits) => void;
    handleAddFavoriteCity: (city: TCity) => void;
    handleRemoveFavoriteCity: (cityId?: string) => void;
    currentCity: TCity | null;
    isLocationLoading: boolean,
    favoriteCities: TCity[],
    units: TUnits,
};

const WeatherContext = createContext<TWeatherContext | null>(null);

const WeatherProvider = ({ children }: { children: ReactNode }) => {
    const [isLocationLoading, setIsLocationLoading] = useState(false);
    const [units, setUnits] = useState<TUnits>("metric");
    const [currentCity, setCurrentCity] = useState<TCity | null>(null);

    // Favorite Cities List
    const [favoriteCities, setFavoriteCities] = useState<TCity[]>([]);

    // Add Favorite City
    function handleAddFavoriteCity(newCity: TCity) {
        newCity.id = crypto.randomUUID();
        setFavoriteCities([...favoriteCities, newCity]);
    }

    // Remove Favorite City
    function handleRemoveFavoriteCity(cityId?: string) {
        setFavoriteCities(prev => prev.filter(city => city.id !== cityId));
    }

    // Change weather details units - Celsius, Fahrenheit
    function changeUnits(units: TUnits) {
        setUnits(units);
    }

    // Get Location and fetch current city details to later fetch current weather and forecast using city name
    function handleLocationCallback(pos: GeolocationPosition) {
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
