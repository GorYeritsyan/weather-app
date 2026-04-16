import { Route, Routes } from "react-router";

import Home from "./pages/Home.tsx";
import RootLayout from "./layouts/RootLayout.tsx";
import FavoriteCities from "./pages/FavoriteCities.tsx";
import FavoriteCity from "./pages/FavoriteCity.tsx";

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