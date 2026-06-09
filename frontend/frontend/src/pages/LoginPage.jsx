import "../styles/LoginPage.css";
import { Link } from "react-router";
import Navbar from "../components/Navbar";

export default function LoginPage() {
  return (
    <div className="page">
      <Navbar />
      <header className="banner">
        <div className="banner-content">
          <h1>Todo Quest</h1>
          <p>Sign In</p>
        </div>
      </header>
      <main className="login-layout">
        <div className="window login-window">
          <div className="window-title">
            Login
          </div>
          <div className="window-content">
            <div className="login-form">
              <div className="input-container">
                <label>Username</label>
                <input
                  type="text"
                  className="pixel-input"
                />
                <label>Password</label>
                <input
                  type="password"
                  className="pixel-input"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="save-button"
                >
                  Login
                </button>
              </div>
            </div>
            <div className="register-link">
              Don't have an account? <Link className="link-style" to="/register"> Register </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}