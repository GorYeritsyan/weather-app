import Container from "./Container.jsx";
import { NavLink } from "react-router";

const headerRoutes = [
    {
        path: "/",
        title: "Home"
    },

    {
        path: "/cities",
        title: "Favorite Cities"
    }
]

const Header = () => {
    return (
        <header className="border-b border-b-gray-200 shadow-xs shadow-gray-200">
            <Container>
                <div className="py-5">
                    <ul className="flex items-center gap-6 font-semibold">
                        {headerRoutes.map(route => (
                            <li key={route.path}>
                                <NavLink
                                    to={route.path}
                                    className={({ isActive }) => isActive && "text-blue-500"}
                                >
                                    {route.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </Container>
        </header>
    );
}

export default Header;