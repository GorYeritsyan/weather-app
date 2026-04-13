import { Route, Routes } from "react-router";
import Home from "./pages/Home.jsx";
import RootLayout from "./layouts/RootLayout.jsx";
import FavoriteCities from "./pages/FavoriteCities.jsx";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path="favorites" element={<FavoriteCities />} />
            </Route>
        </Routes>
    )
}

export default App;