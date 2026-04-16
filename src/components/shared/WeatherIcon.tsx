import { imageBaseUrl } from "../../api/api.ts";

const WeatherIcon = ({ icon, className }) => {
    return (
        <img
            className={className}
            src={`${imageBaseUrl}/${icon}.png`}
            alt="weather icon"
        />
    )
}
export default WeatherIcon
