import { useWeather } from "../providers/WeatherProvider.jsx";

export const useFetch = (url) => {
    const { units } = useWeather();

    return () => (
        fetch(`${import.meta.env.VITE_BASE_URL}/${url}&units=${units}&appid=${import.meta.env.VITE_API_KEY}`)
            .then(res => res.json())
    );
}