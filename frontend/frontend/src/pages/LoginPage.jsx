import "../styles/LoginPage.css";
import { Link } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogout() {

    await fetch(
      "http://127.0.0.1:8000/api/logout/",
      {
        method: "POST",
        credentials: "include"
      }
    );

    localStorage.removeItem("user");

    navigate("/login");
  }

  async function handleLogin(e) {
    e.preventDefault();

    setError("");

    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
            username,
            password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.user_id,
          username: data.username
        })
      );

      navigate("/");

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
          <p>Sign In</p>
        </div>
      </header>
      <main className="login-layout">
        <div className="window login-window">
          <div className="window-title">
            Login
          </div>
          <div className="window-content">
            <form onSubmit={handleLogin} className="login-form">
              <div className="input-container">
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                />
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="save-button"
                >
                  Login
                </button>
                {
                  error &&
                  <div className="error-message">
                    {error}
                  </div>
                }
              </div>
            </form>
            <div className="register-link">
              Don't have an account? <Link className="link-style" to="/register"> Register </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}