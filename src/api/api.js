class WeatherAPI {
    // Fetch Instance for Weather API
    fetchInstance(queryString) {
        return fetch(`${import.meta.env.VITE_BASE_URL}${queryString}&appid=${import.meta.env.VITE_API_KEY}`)
            .then(res => res.json());
    }

    // Fetch Instance for Geocoding API
    fetchGeolocationInstance(queryString) {
        return fetch(`${import.meta.env.VITE_GEOCODING_BASE_URL}${queryString}&appid=${import.meta.env.VITE_API_KEY}`)
            .then(res => res.json());
    }

    // Fetch Weather details
    fetchWeather(query, units) {
        return this.fetchInstance(`/weather?q=${query}&units=${units}`);
    }

    // Fetch forecast - (5-Day / 3-Hour data)
    fetchForecast(query, units) {
        return this.fetchInstance(`/forecast?q=${query}&units=${units}`);
    }

    // Fetch geolocations by provided query
    fetchDirectGeolocation(query) {
        return this.fetchGeolocationInstance(`/direct?q=${query}&limit=10`);
    }

    // Fetch geolocations by provided latitude and longitude
    fetchReverseGeolocation({ lat, lon }) {
        return this.fetchGeolocationInstance(`/reverse?lat=${lat}&lon=${lon}&limit=1`);
    }
}

export const weatherApi = new WeatherAPI();