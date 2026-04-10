import { useEffect, useState } from "react";
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from "react-icons/tb";
import Container from "../components/shared/Container.jsx";
import HourlyForecastCard from "../components/shared/HourlyForecastCard.jsx";

const Home = () => {
    const [coordinates, setCoordinates] = useState(null);
    const [data, setData] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);

    const [forecast, setForecast] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_URL}/forecast?q=yerevan&units=metric&appid=${import.meta.env.VITE_API_KEY}`)
            .then(res => res.json())
            .then(data => setForecast(data.list))
    }, []);

    // forecast.reduce((acc, item) => {
    //     // const day = item?.dt_text.split(" ")[0];
    //     console.log("day", day);
    // }, {})


    const groupedForecast = forecast?.reduce((acc, item) => {
        const day = item?.dt_txt?.split(" ")[0];

        if (!acc[day]) acc[day] = [];
        console.log(day)
        acc[day].push(item);

        return acc;
    }, {});

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

    function handleDayChange(day) {
        setSelectedDay(day);
    }
    console.log(groupedForecast);
    console.log("selectedDay");

    return (
        <Container>
            <div className="flex flex-col items-start py-10 gap-4">
                <div className="flex gap-2 w-full overflow-x-auto">
                    {Object.entries(groupedForecast).map(([day, hours]) => (
                        <div onClick={() => handleDayChange(day)} className="flex text-white items-center justify-between gap-3 px-3 py-1 rounded-lg bg-blue-600/80 border border-blue-400  w-fit">
                            <div className="flex items-center gap-3 text-lg">
                                <span className="font-semibold">{new Date(day).toDateString().split(" ")?.[0]}</span>

                                <span className="font-semibold">
                            {Math.round(hours?.[0]?.main?.temp)}°
                        </span>
                            </div>

                            <img className="size-[40px] " src={`https://openweathermap.org/payload/api/media/file/${hours?.[0]?.weather?.[0]?.icon}.png`} />
                        </div>
                    ))}
                </div>

                <div className="flex items-start gap-10">
                    <div className="flex items-center justify-center">
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

                    <div>
                        <h3 className="font-semibold text-2xl">Hourly forecast</h3>
                        <div className="flex gap-2 flex-wrap">
                            {Object.entries(groupedForecast).find(([day, hours]) => day === selectedDay)?.[1].map((elem) => (
                                <HourlyForecastCard forecastDetails={elem} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Home;