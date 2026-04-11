import { useEffect, useState } from "react";
import Container from "../components/shared/Container.jsx";
import SearchInput from "../components/shared/SearchInput.jsx";
import Cities from "../components/shared/Cities.jsx";

const FavoriteCities = () => {
    const [favoriteCities, setFavoriteCities] = useState([]);

    useEffect(() => {
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=f&limit=10&appid=${import.meta.env.VITE_API_KEY}`)
            .then(res => res.json())
            .then(data => console.log(data))
    }, []);

    function handleAddToFavorite(newCity) {
        setFavoriteCities([...favoriteCities, newCity]);
    }

    console.log(favoriteCities);

    return (
        <Container>
            <div className="flex flex-col gap-6 py-10">
                <h3 className="text-3xl font-semibold">Favorite Cities</h3>

                <div className="flex flex-col gap-4">
                    <SearchInput favoriteCities={favoriteCities} onAddToFavorite={handleAddToFavorite} />
                    <Cities cities={favoriteCities} />
                </div>
            </div>
        </Container>
    );
}

export default FavoriteCities;