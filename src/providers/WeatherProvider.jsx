import { createContext, useContext, useState } from 'react'

const WeatherContext = createContext(null);

const WeatherProvider = ({ children }) => {
    const [units, setUnits] = useState("metric");
    const [selectedCity, setSelectedCity] = useState("");

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
