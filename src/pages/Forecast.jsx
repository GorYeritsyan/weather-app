import Container from "../components/shared/Container.jsx";
import {useEffect, useState} from "react";

const Forecast = () => {
    const [forecast, setForecast] = useState(null);

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


    return (
        <Container>
            Forecast
        </Container>
    )
}

export default Forecast;