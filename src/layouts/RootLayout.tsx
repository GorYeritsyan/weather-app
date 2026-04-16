import { Outlet } from "react-router";
import Header from "../components/shared/Header.tsx";

const RootLayout = () => {
    return (
        <main>
            <Header />
            <Outlet />
        </main>
    );
}

export default RootLayout;