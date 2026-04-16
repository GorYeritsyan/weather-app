
// Units Type - Celsius, Fahrenheit
export type TUnits = "metric" | "imperial";

export type TCity = {
    id?: string;
    country: string;
    local_names: { [key: string]: string }[];
    lat: number;
    lon: number;
    name: string;
    state: string;
};

export type TWeather = {
    coord: {
        lon: number;
        lat: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level: number;
        grnd_level: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    rain: {
        [key: string]: number;
    };
    clouds: {
        all: number;
    };
    dt: number;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
};

export type TForecast = {
    cod: string;
    message: number;
    cnt: number;
    list: TWeather[];
}