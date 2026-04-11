import {useLocation, useParams} from "react-router";
import Container from "../components/shared/Container.jsx";
import SearchInput from "../components/shared/SearchInput.jsx";
import Cities from "../components/shared/Cities.jsx";

const FavoriteCities = () => {
    const location = useLocation();
    console.log(location.pathname);

    return (
        <Container>
            <div className="flex flex-col gap-6 py-10">
                <h3 className="text-3xl font-semibold">Favorite Cities</h3>

                <div className="flex flex-col gap-4">
                    <SearchInput />
                    <Cities />
                </div>
            </div>
        </Container>
    );
}

export default FavoriteCities;