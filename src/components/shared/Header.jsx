import Container from "./Container.jsx";
import {NavLink} from "react-router";

const Header = () => {
    return (
        <header className="border-b border-b-gray-200 shadow-xs shadow-gray-200">
            <Container>
                <div className="py-5">
                    <ul className="flex items-center gap-6 font-semibold">
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/forecast">5 day / 3 hour forecast</NavLink>
                        </li>
                        <li>
                            <NavLink to="/cities">Favorite Cities</NavLink>
                        </li>
                    </ul>
                </div>
            </Container>
        </header>
    );
}

export default Header;