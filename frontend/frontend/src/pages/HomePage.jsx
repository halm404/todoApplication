import "../styles/HomePage.css";
import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import Navbar from "../components/Navbar";
import { authenticatedFetch } from "../api";

export default function HomePage() {
  const [showTaskModal, setShowTaskModal] = useState(false);

  const [showListDialog, setShowListDialog] = useState(false);

  const [lists, setLists] = useState([]);
  const [listName, setListName] = useState("");

  const [error, setError] = useState("");

  const [selectedList, setSelectedList] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");

  useEffect(() => {
    loadLists();
  }, []);

  async function loadLists() {
    try {
      const response = await authenticatedFetch(
        "http://localhost:8000/api/lists/"
      );

      const data = await response.json();

      if (Array.isArray(data)) {
        setLists(data);
      } else {
        console.error("Unexpected response:", data);
        setLists([]);
      }
    } catch {
      console.error("Could not load lists.");
    }
  }

  async function loadTasks(listId) {
    try {
      const response = await authenticatedFetch(
        `http://localhost:8000/api/lists/${listId}/tasks/`
      );

      const data = await response.json();

      setTasks(data);

    } catch {
      console.error("Could not load tasks.");
    }
  }

  async function handleCreateList(e) {
    e.preventDefault();

    setError("");

    if (!listName.trim()) {
      setError("Please enter a list name.");
      return;
    }

    try {
      const response = await authenticatedFetch(
        "http://localhost:8000/api/lists/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: listName,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Could not create list.");
        return;
      }

      setListName("");
      setShowListDialog(false);
      loadLists();
    } catch {
      setError("Could not connect to the server.");
    }
  }

  async function handleCreateTask(e) {
    e.preventDefault();

    if (!selectedList) {
      setError("Please select a list first.");
      return;
    }

    try {
      await fetch(
        `http://localhost:8000/api/lists/${selectedList.id}/tasks/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      setTaskTitle("");
      setTaskDeadline("");

      setShowTaskModal(false);

      loadTasks(selectedList.id);

    } catch {
      setError("Server unavailable.");
    }
  }

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
              {
                lists.length === 0 ? (
                  <div className="empty-message">
                    No lists found
                  </div>
                ) : (
                  <div className="list-container">
                    {lists.map((list) => (
                      <button
                        key={list.id}
                        to={`/lists/${list.id}`}
                        className="menu-button"
                        onClick={() => {
                          setSelectedList(list);
                          loadTasks(list.id);
                        }}
                      >
                        {list.name}
                      </button>
                    ))}
                  </div>
                )
              }
              <button
                className="action-button"
                onClick={() => setShowListDialog(true)}
              >
                + New List
              </button>
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
              {selectedList ? selectedList.name : "Current List"}
            </div>
            <div className="window-content">
              <button
                className="action-button"
                disabled={!selectedList}
                onClick={() => setShowTaskModal(true)}
              >
                + New Task
              </button>
              {!selectedList ? (
                <div className="empty-message">
                  Select a list to view tasks.
                </div>
              ) : tasks.length === 0 ? (
                <div className="empty-message">
                  This list has no tasks.
                </div>
              ) : (
                <div className="task-list">
                  {tasks.map(task => (
                    <div
                      key={task.id}
                      className="window"
                    >
                      <div className="window-title">
                        {task.title}
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
        draggable={true}
      >
        <div className="window-content">
          <form className="task-form" onSubmit={handleCreateTask}>
            <div className="input-container">
              <label>Title</label>
              <input
                type="text"
                className="pixel-input"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
              <label>Deadline</label>
              <input
                type="datetime-local"
                className="pixel-input"
                value={taskDeadline}
                onChange={(e) => setTaskDeadline(e.target.value)}
              />
            </div>
            <div className="modal-actions">
              <button type="submit" className="save-button">
                Save
              </button>
              <button
                className="warning-button"
                onClick={() => setShowTaskModal(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Dialog>
      <Dialog
        header="New List"
        visible={showListDialog}
        onHide={() => setShowListDialog(false)}
        draggable={true}
      >
        <div className="window-content">
          <div className="task-form">
            <form
              className="task-form"
              onSubmit={handleCreateList}
            >
              <label>Name</label>
              <input
                className="pixel-input"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
              />
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}
              <div className="modal-actions">
                <button
                  type="submit"
                  className="save-button"
                >
                  Create list
                </button>
                <button
                  type="button"
                  className="warning-button"
                  onClick={() => setShowListDialog(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
}