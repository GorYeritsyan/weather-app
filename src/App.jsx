import { Route, Routes } from "react-router";
import Home from "./pages/Home.jsx";
import RootLayout from "./layouts/RootLayout.jsx";
import FavoriteCities from "./pages/FavoriteCities.jsx";
import Forecast from "./pages/Forecast.jsx";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path="forecast" element={<Forecast />} />
                <Route path="cities" element={<FavoriteCities />} />
            </Route>
        </Routes>
    )
}

export default App;