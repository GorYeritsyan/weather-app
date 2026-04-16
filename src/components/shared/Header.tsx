import { NavLink } from "react-router";
import Container from "./Container.tsx";
import { cn } from "../../utils";
import ToggleUnits from "./ToggleUnits.tsx";

const headerRoutes = [
    {
        path: "/",
        title: "Home"
    },
    {
        path: "/favorites",
        title: "Favorite Cities"
    }
];

const Header = () => {
    return (
        <header className="border-b border-b-gray-200 shadow-xs shadow-gray-200">
            <Container>
                <div className="py-3 flex items-center justify-between">
                    <ul className="flex items-center gap-6 font-semibold">
                        {headerRoutes.map(route => (
                            <li key={route.path}>
                                <NavLink
                                    to={route.path}
                                    className={({ isActive }) => cn(isActive && "text-blue-500")}
                                >
                                    {route.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* Toggle between celsius and fahrenheit */}
                   <div>
                       <ToggleUnits />
                   </div>
                </div>
            </Container>
        </header>
    );
}

export default Header;