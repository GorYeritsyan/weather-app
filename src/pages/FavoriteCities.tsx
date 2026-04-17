import Container from "../components/shared/Container";
import SearchInput from "../components/shared/search/SearchInput";
import Cities from "../components/shared/Cities";

const FavoriteCities = () => {
    return (
        <Container>
            <div className="flex flex-col gap-6 py-10">
                <h3 className="text-3xl font-semibold">Favorite Cities</h3>

                <div className="flex flex-col gap-4 w-fit">
                    <SearchInput />
                    <Cities />
                </div>
            </div>
        </Container>
    );
}

export default FavoriteCities;