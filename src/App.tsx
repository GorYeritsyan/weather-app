import { Route, Routes } from "react-router";

import Home from "./pages/Home";
import RootLayout from "./layouts/RootLayout";
import FavoriteCities from "./pages/FavoriteCities";
import FavoriteCity from "./pages/FavoriteCity";

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