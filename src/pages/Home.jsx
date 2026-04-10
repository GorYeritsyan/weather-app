import { useEffect, useState } from "react";
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from "react-icons/tb";
import Container from "../components/shared/Container.jsx";

const Home = () => {
    const [coordinates, setCoordinates] = useState(null);
    const [data, setData] = useState(null);
    const [forecast, setForecast] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_URL}/weather?q=yerevan&units=metric&appid=${import.meta.env.VITE_API_KEY}`)
            .then(res => res.json())
            .then(res => setData(res))
    }, [coordinates]);
    console.log("forecast", forecast);

    useEffect(() => {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        };

        function success(pos) {
            const crd = pos.coords;

            console.log("Your current position is:");
            console.log(`Latitude: ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
        }

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);
    }, []);

    return (
        <Container>
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col gap-15 p-5 rounded-xl bg-blue-400/40 shadow-sm shadow-gray-200 min-w-[380px]">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <h3 className="font-semibold text-xl">{`${data?.name}, ${data?.sys?.country}`}</h3>
                            <span className="font-semibold text-sm">{new Date().toLocaleTimeString()}</span>
                        </div>
                        <img className="size-[70px]" src={`https://openweathermap.org/payload/api/media/file/${data?.weather?.[0]?.icon}.png`} />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1 items-center">
                            <span className="font-semibold text-5xl">
                                {Math.round(data?.main?.temp)}°
                            </span>
                        </div>

                        <div className="flex flex-col capitalize font-semibold items-center gap-1">
                            <span className="text-xl">{data?.weather?.[0]?.description}</span>
                            <span className="text-lg">Feels like {Math.round(data?.main?.feels_like)}°</span>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Home;