import { Outlet } from "react-router";
import Header from "../components/shared/Header.jsx";

const RootLayout = () => {
    return (
        <main>
            <Header />
            <Outlet />
        </main>
    );
}

export default RootLayout;