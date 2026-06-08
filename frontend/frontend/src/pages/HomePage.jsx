import "../styles/HomePage.css";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import Navbar from "../components/Navbar";

export default function HomePage() {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);

  return (
    <div className="page">
      <Navbar />
      <header className="banner">
        <div className="banner-content">
          <h1>Todo Quest</h1>
          <p>Organize your tasks.</p>
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
      <Dialog
        header="Add Task"
        visible={showTaskModal}
        onHide={() => setShowTaskModal(false)}
        draggable={false}
      >
        <div className="window-content">
          <div className="task-form">
            <div className="input-container">
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
            </div>
            <div className="modal-actions">
              <button className="save-button">
                Save
              </button>
              <button
                className="action-button"
                onClick={() => setShowTaskModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Dialog>
      <Dialog
        header="Add List"
        visible={showListModal}
        onHide={() => setShowListModal(false)}
        draggable={false}
      >
        <div className="window-content">
          <div className="task-form">
            <div className="input-container">
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
            </div>
            <div className="modal-actions">
              <button className="save-button">
                Save
              </button>
              <button
                className="action-button"
                onClick={() => setShowListModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}