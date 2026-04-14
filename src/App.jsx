import { Route, Routes } from "react-router";
import Home from "./pages/Home.jsx";
import RootLayout from "./layouts/RootLayout.jsx";
import FavoriteCities from "./pages/FavoriteCities.jsx";
import FavoriteCity from "./pages/FavoriteCity.jsx";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path="favorites" element={<FavoriteCities />} />
                <Route path="favorites/:countryName/:cityName" element={<FavoriteCity />} />
            </Route>
        </Routes>
    )
}

export default App;