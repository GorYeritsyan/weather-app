import type { TCity, TForecast, TUnits, TWeather } from "../types/types.ts";

export const imageBaseUrl = "//openweathermap.org/payload/api/media/file";

class WeatherAPI {
    baseUrl: string;
    apiKey: string;

    constructor() {
        this.baseUrl = "//api.openweathermap.org";
        this.apiKey = import.meta.env.VITE_API_KEY;
    }

    // Fetch Instance for Weather API
    async fetchInstance<TData>(queryString: string): Promise<TData> {
        return await fetch(`${this.baseUrl}/data/2.5${queryString}&appid=${this.apiKey}`)
            .then(res => res.json())
    }

    // Fetch Instance for Geocoding API
    async fetchGeolocationInstance<TData>(queryString: string): Promise<TData> {
        return await fetch(`${this.baseUrl}/geo/1.0${queryString}&appid=${this.apiKey}`)
            .then(res => res.json());
    }

    // Fetch Weather details
    fetchWeather(query: string, units: TUnits) {
        return this.fetchInstance<TWeather>(`/weather?q=${query}&units=${units}`);
    }

    // Fetch forecast - (5-Day / 3-Hour data)
    fetchForecast(query: string, units: TUnits) {
        return this.fetchInstance<TForecast>(`/forecast?q=${query}&units=${units}`);
    }

    // Fetch geolocations by provided query
    fetchDirectGeolocation(query: string) {
        return this.fetchGeolocationInstance<TCity[]>(`/direct?q=${query}&limit=10`);
    }

    // Fetch geolocations by provided latitude and longitude
    fetchReverseGeolocation({ lat, lon }: { lat: number; lon: number }) {
        return this.fetchGeolocationInstance<TCity[]>(`/reverse?lat=${lat}&lon=${lon}&limit=1`);
    }
}

export const weatherApi = new WeatherAPI();