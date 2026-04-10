import {useLocation, useParams} from "react-router";

const FavoriteCities = () => {
    const location = useLocation();
    console.log(location.pathname);

    return (
        <div>Favorite Cities</div>
    );
}

export default FavoriteCities;