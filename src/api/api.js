export const weatherApi = {
    fetchWeather(query) {
        return fetch(`${import.meta.env.VITE_BASE_URL}/${query}&appid=${import.meta.env.VITE_API_KEY}`)
            .then(res => res.json());
    },

    fetchGeolocations(query) {
        return fetch(`${import.meta.env.VITE_GEOCODING_BASE_URL}/direct?q=${query}&limit=10&appid=${import.meta.env.VITE_API_KEY}`)
            .then(res => res.json());
    }
}