export const weatherApi = {
    fetchWeather(query) {
        return fetch(`${import.meta.env.VITE_BASE_URL}/${query}&appid=${import.meta.env.VITE_API_KEY}`)
            .then(res => res.json());
    },

    fetchGeolocations({ query, lat, lon, endpoint = "direct" }) {
        let searchParams;

        if (endpoint === "direct") {
            searchParams = new URLSearchParams({ q: query, limit: 10 });
        } else if (endpoint === "reverse") {
            searchParams = new URLSearchParams({ lat, lon, limit: 1 });
        }

        return fetch(`${import.meta.env.VITE_GEOCODING_BASE_URL}/${endpoint}?${searchParams}&appid=${import.meta.env.VITE_API_KEY}`)
            .then(res => res.json());
    },

    fetchNameByCoordinates({ lat, lon }) {
        const searchParams = new URLSearchParams({ lat, lon });
        console.log(searchParams.toString());
        return fetch(`${import.meta.env.VITE_GEOCODING_BASE_URL}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${import.meta.env.VITE_API_KEY}`)
            .then(res => res.json());
    }
}