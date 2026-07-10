import "../styles/HomePage.css";
import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import Navbar from "../components/Navbar";

export default function HomePage() {
  const [showTaskModal, setShowTaskModal] = useState(false);

  const [showListDialog, setShowListDialog] = useState(false);

  const [lists, setLists] = useState([]);
  const [listTitle, setListTitle] = useState("");
  const [listDescription, setListDescription] = useState("");

  const [error, setError] = useState("");

  const [selectedList, setSelectedList] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");

  useEffect(() => {
    loadLists();
  }, []);

  async function loadLists() {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/lists/",
        {
          credentials: "include"
        }
      );

      const data = await response.json();

      setLists(data);

    } catch {
      console.error("Could not load lists.");
    }
  }

  async function loadTasks(listId) {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/lists/${listId}/tasks/`,
        {
          credentials: "include"
        }
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

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/lists/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
            title: listTitle,
            description: listDescription
          })
        }
      );

      const data = await response.json();

      if (!data.ok) {
        setError("Could not create list.");
        return;
      }

      setListTitle("");
      setListDescription("");

      setShowListDialog(false);

      loadLists();

    } catch {
      setError("Server unavailable.");
    }
  }

  async function handleCreateTask(e) {
    e.preventDefault();

    if (!selectedList) {
      setError("Please select a list first.");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/lists/${selectedList.id}/tasks/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
            title: taskTitle,
            description: taskDescription,
            deadline: taskDeadline
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError("Could not create task.");
        return;
      }

      setTaskTitle("");
      setTaskDescription("");
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
              <button
                className="action-button"
                onClick={() => setShowListDialog(true)}
              >
                + New List
              </button>
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

                      <div className="window-content">
                        <p>{task.description}</p>
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
        draggable={false}
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
              <label>Description</label>
              <textarea
                rows="5"
                className="pixel-textarea"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
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
        draggable={false}
      >
        <div className="window-content">
          <div className="task-form">
            <form
              className="task-form"
              onSubmit={handleCreateList}
            >
              <label>Title</label>

              <input
                className="pixel-input"
                value={listTitle}
                onChange={(e) => setListTitle(e.target.value)}
              />

              <label>Description</label>

              <textarea
                rows={4}
                className="pixel-textarea"
                value={listDescription}
                onChange={(e) => setListDescription(e.target.value)}
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
                  {selectedList ? selectedList.title : "Current List"}
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