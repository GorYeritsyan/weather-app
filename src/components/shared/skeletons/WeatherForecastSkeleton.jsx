import Skeleton from "../../ui/Skeleton.jsx";

const WeatherForecastSkeleton = () => {
    return (
        <div className="flex flex-col gap-5">
            <Skeleton className="h-12" />
            <Skeleton className="h-28" />
        </div>
    )
}

export default WeatherForecastSkeleton;