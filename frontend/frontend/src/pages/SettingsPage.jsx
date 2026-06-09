import "../styles/SettingsPage.css";
import { Link } from "react-router";
import Navbar from "../components/Navbar";

export default function SettingsPage() {
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

            <div className="window-content">

              <label>Theme</label>

              <select className="pixel-input">
                <option>Default</option>
                <option>Dark</option>
                <option>Pastel</option>
                <option>Retro Green</option>
              </select>

              <button className="action-button">
                Save Theme
              </button>

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

                  <button className="menu-button">
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