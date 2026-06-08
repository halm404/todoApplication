import "../styles/RegisterPage.css";
import { Link } from "react-router";

export default function RegisterPage() {
  return (
    <div className="register-page">
      <header className="banner">
        <div className="banner-content">
          <h1>Todo Quest</h1>
          <p>Create Account</p>
        </div>
      </header>
      <main className="register-layout">
        <div className="window register-window">
          <div className="window-title">
            Register
          </div>
          <div className="window-content">
            <div className="register-form">
              <label>Username</label>
              <input
                type="text"
                className="pixel-input"
              />
              <label>Email</label>
              <input
                type="email"
                className="pixel-input"
              />
              <label>Password</label>
              <input
                type="password"
                className="pixel-input"
              />
              <label>Confirm Password</label>
              <input
                type="password"
                className="pixel-input"
              />
              <button
                type="submit"
                className="save-button"
              >
                Register
              </button>
            </div>
            <div className="login-link">
              Already have an account? <Link className="link-style" to="/login" > Login </Link></div>
          </div>
        </div>
      </main>
    </div>
  );
}