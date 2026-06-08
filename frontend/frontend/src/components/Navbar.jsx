import { Link } from "react-router";

export default function Navbar() {
    return (
        <nav className="main-nav">
            <Link to="/" className="nav-button">
                Home
            </Link>
            <Link to="/login" className="nav-button">
                Login
            </Link>
            <Link to="/register" className="nav-button">
                Register
            </Link>
            <Link to="/settings" className="nav-button">
                Settings
            </Link>
        </nav>
    );
}