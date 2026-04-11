const WeatherIcon = ({ icon, className }) => {
    return (
        <img
            className={className}
            src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${icon}.png`}
            alt="weather icon"
        />
    )
}
export default WeatherIcon
