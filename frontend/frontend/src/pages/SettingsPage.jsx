import "../styles/SettingsPage.css";
import { Link } from "react-router";
import Navbar from "../components/Navbar";
import "../theme.css";
import { useTheme } from "../contexts/ThemeContext";
import { Dropdown } from "primereact/dropdown";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const themes = [
    {
      label: "Pastel",
      value: "pastel"
    },
    {
      label: "Dark",
      value: "dark"
    },
    {
      label: "Retro Green",
      value: "retro"
    }
  ];
  return (
    <div className="page">
      <Navbar />
      <header className="banner">
        <div className="banner-content">
          <h1>Todo Quest</h1>
          <p>Settings</p>
        </div>
      </header>
      <div className="settings-layout">
        <div className="window">
          <div className="window-title">
            Navigation
          </div>
          <div className="window-content">
            <Link
              to="/"
              className="nav-button settings-link"
            >
              Back to Home
            </Link>
            <button className="menu-button">
              Done Tasks
            </button>
          </div>
        </div>
        <div className="settings-content">
          <div className="window">
            <div className="window-title">
              Theme
            </div>
            <div className="theme-container">
              <label>
                Theme
              </label>
              <div>
                <Dropdown
                  value={theme}
                  options={themes}
                  optionLabel="label"
                  optionValue="value"
                  onChange={(e) => setTheme(e.value)}
                  placeholder="Select Theme"
                />
              </div>
            </div>
          </div>
          <div className="window">
            <div className="window-title">
              Change Password
            </div>
            <div className="window-content">
              <div className="password-form">
                <label>Current Password</label>
                <input
                  type="password"
                  className="pixel-input"
                />
                <label>New Password</label>
                <input
                  type="password"
                  className="pixel-input"
                />
                <label>Confirm New Password</label>
                <input
                  type="password"
                  className="pixel-input"
                />
                <button className="action-button">
                  Update Password
                </button>
              </div>
            </div>
          </div>
          <div className="window">
            <div className="window-title">
              Done Tasks Archive
            </div>
            <div className="window-content">
              <p>
                Completed tasks remain here for
                30 days before automatic removal.
              </p>
              <div className="done-task-list">
                <div className="done-task-item">
                  <span>
                    Example Completed Task
                  </span>
                  <button className="warning-button">
                    Delete Permanently
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}