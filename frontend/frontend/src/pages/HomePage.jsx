import "../styles/HomePage.css";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Link } from "react-router";

export default function HomePage() {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);

  return (
    <div className="homepage">
      <header className="banner">
        <div className="banner-content">
          <h1>Todo Quest</h1>

          <p>Organize your tasks.</p>

          <nav className="main-nav">
            <Link
              to="/login"
              className="nav-button"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="nav-button"
            >
              Register
            </Link>

            <Link
              to="/settings"
              className="nav-button"
            >
              Settings
            </Link>
          </nav>
        </div>
      </header>

      <div className="main-layout">
        <aside className="sidebar-left">
          <div className="window">
            <div className="window-title">
              Lists
            </div>

            <div className="window-content">
              <button
                className="action-button"
                onClick={() => setShowListModal(true)}
              >
                + New List
              </button>

              <div className="empty-message">
                No lists found
              </div>
            </div>
          </div>

          <div className="window">
            <div className="window-title">
              Filters
            </div>

            <div className="window-content">
              <button className="menu-button">
                Active
              </button>

              <button className="menu-button">
                Completed
              </button>

              <button className="menu-button">
                All
              </button>
            </div>
          </div>
        </aside>

        <main className="content">
          <div className="window large-window">
            <div className="window-title">
              Current List
            </div>

            <div className="window-content">
              <button
                className="action-button"
                onClick={() => setShowTaskModal(true)}
              >
                + New Task
              </button>

              <div className="empty-message">
                Select a list to view tasks.
              </div>
            </div>
          </div>
        </main>

        <aside className="sidebar-right">
          <div className="window">
            <div className="window-title">
              Upcoming
            </div>

            <div className="window-content">
              No upcoming tasks
            </div>
          </div>

          <div className="window">
            <div className="window-title">
              Statistics
            </div>

            <div className="window-content">
              <div className="stat-row">
                Active: 0
              </div>

              <div className="stat-row">
                Done: 0
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Add Task Dialog */}

      <Dialog
        header="Add Task"
        visible={showTaskModal}
        onHide={() => setShowTaskModal(false)}
        draggable={false}
      >
        <div className="task-form">
          <label>Title</label>

          <input
            type="text"
            className="pixel-input"
          />

          <label>Description</label>

          <textarea
            rows="5"
            className="pixel-textarea"
          />

          <label>Deadline</label>

          <input
            type="datetime-local"
            className="pixel-input"
          />

          <div className="modal-actions">
            <button className="save-button">
              Save
            </button>

            <button
              className="menu-button"
              onClick={() => setShowTaskModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Dialog>

      {/* Add List Dialog */}

      <Dialog
        header="Add List"
        visible={showListModal}
        onHide={() => setShowListModal(false)}
        draggable={false}
      >
        <div className="task-form">
          <label>List Name</label>

          <input
            type="text"
            className="pixel-input"
          />

          <label>Description (optional)</label>

          <textarea
            rows="4"
            className="pixel-textarea"
          />

          <div className="modal-actions">
            <button className="save-button">
              Save
            </button>

            <button
              className="menu-button"
              onClick={() => setShowListModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}