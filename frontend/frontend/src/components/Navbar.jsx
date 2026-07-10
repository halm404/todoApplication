import { Link, useNavigate } from "react-router";

export default function Navbar() {
    const navigate = useNavigate();
    const loggedIn = localStorage.getItem("user");

    async function handleLogout() {
        try {
            await fetch(
                "http://127.0.0.1:8000/api/logout/",
                {
                    method: "POST",
                    credentials: "include",
                }
            );
        } catch {
            // Ignore server errors during logout
        }

        localStorage.removeItem("user");
        navigate("/login");
    }


    return (
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
                </>
            ) : (
                <>
                    <Link to="/login" className="nav-button">
                        Login
                    </Link>

                    <Link to="/register" className="nav-button">
                        Register
                    </Link>
                </>
            )}
        </nav>
    );
}