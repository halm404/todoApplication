import { Link, useNavigate } from "react-router";
import { Dropdown } from "primereact/dropdown";
import { useTheme } from "../contexts/ThemeContext";

export default function Navbar() {
    const navigate = useNavigate();
    const loggedIn = localStorage.getItem("user");

    function handleLogout() {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");

        navigate("/login");
    }

    const { theme, setTheme } = useTheme();
    const themes = [
        {
            label: "Pastel",
            value: "pastel"
        },
        {
            label: "Moss",
            value: "dark"
        },
        {
            label: "Mushrooms",
            value: "retro"
        }
    ];


    return (
        <>
            <nav className="main-nav">
                {loggedIn ? (
                    <>
                        <Link to="/" className="nav-button">
                            Home
                        </Link>
                        <Link to="/settings" className="nav-button">
                            Settings
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="logout-button"
                        >
                            Logout
                        </button>
                        <div className="theme-button">
                            <Dropdown
                                value={theme}
                                options={themes}
                                optionLabel="label"
                                optionValue="value"
                                onChange={(e) => setTheme(e.value)}
                                valueTemplate={() => "Theme"}
                                placeholder="Theme"
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-button">
                            Login
                        </Link>

                        <Link to="/register" className="nav-button">
                            Register
                        </Link>
                        <div className="theme-button">
                            <Dropdown
                                value={theme}
                                options={themes}
                                optionLabel="label"
                                optionValue="value"
                                onChange={(e) => setTheme(e.value)}
                                valueTemplate={() => "Theme"}
                                placeholder="Theme"
                            />
                        </div>
                    </>
                )}
            </nav>
        </>
    );
}