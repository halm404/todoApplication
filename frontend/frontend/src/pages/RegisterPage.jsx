import "../styles/RegisterPage.css";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { useState } from "react";
import Navbar from "../components/Navbar";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username,
            email,
            password
          })
        }
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      navigate("/login");

    } catch {
      setError("Could not connect to the server.");
    }
  }

  return (
    <div className="page">
      <Navbar />
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
            <form className="register-form" onSubmit={handleRegister}>
              <div className="input-container">
                <label>Username</label>
                <input
                  type="text"
                  className="pixel-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label>Email</label>
                <input
                  type="email"
                  className="pixel-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password</label>
                <input
                  type="password"
                  className="pixel-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="pixel-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="save-button"
                >
                  Register
                </button>
                {
                  error &&
                  <div className="error-message">
                    {error}
                  </div>
                }
              </div>
            </form>
            <div className="login-link">
              Already have an account? <Link className="link-style" to="/login" > Login </Link></div>
          </div>
        </div>
      </main>
    </div>
  );
}