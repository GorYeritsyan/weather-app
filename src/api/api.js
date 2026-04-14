export const imageBaseUrl = "//openweathermap.org/payload/api/media/file";

class WeatherAPI {
    constructor() {
        this.baseUrl = "//api.openweathermap.org";
        this.apiKey = import.meta.env.VITE_API_KEY;
    }

    // Fetch Instance for Weather API
    fetchInstance(queryString) {
        return fetch(`${this.baseUrl}/data/2.5${queryString}&appid=${this.apiKey}`)
            .then(res => res.json());
    }

    // Fetch Instance for Geocoding API
    fetchGeolocationInstance(queryString) {
        return fetch(`${this.baseUrl}/geo/1.0${queryString}&appid=${this.apiKey}`)
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