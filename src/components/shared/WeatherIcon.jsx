import { cn } from "../../utils/index.js";

const WeatherIcon = ({ icon, className }) => {
    return (
        <img
            className={className}
            src={`https://openweathermap.org/payload/api/media/file/${icon}.png`}
        />
    )
}
export default WeatherIcon
