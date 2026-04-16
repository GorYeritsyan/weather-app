import { imageBaseUrl } from "../../api/api.ts";

type WeatherIconProps = {
    icon?: string;
    className?: string;
}

const WeatherIcon = ({ icon, className }: WeatherIconProps) => {
    return (
        <img
            className={className}
            src={`${imageBaseUrl}/${icon}.png`}
            alt="weather icon"
        />
    )
}
export default WeatherIcon;
