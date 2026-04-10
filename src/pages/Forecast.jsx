import { useEffect, useState } from "react";
import Container from "../components/shared/Container.jsx";

const Forecast = () => {
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

    console.log(forecast);
    console.log(groupedForecast);

    return (
        <Container>
            {Object.entries(groupedForecast).map(([day, hours]) => (
                <div className="flex text-white items-center justify-between gap-3 px-3 py-1 rounded-lg bg-blue-600/80 border border-blue-400  w-fit">
                    <div className="flex items-center gap-3 text-lg">
                        <span className="font-semibold">{new Date(day).toDateString().split(" ")?.[0]}</span>

                        <span className="font-semibold">
                            {Math.round(hours?.[0]?.main?.temp)}°
                        </span>
                    </div>

                    <img className="size-[40px] " src={`https://openweathermap.org/payload/api/media/file/${hours?.[0]?.weather?.[0]?.icon}.png`} />
                </div>
            ))}
        </Container>
    )
}

export default Forecast;