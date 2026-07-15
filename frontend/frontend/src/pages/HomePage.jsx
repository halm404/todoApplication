import "../styles/HomePage.css";
import { useEffect, useState } from "react";
import { Checkbox } from 'primereact/checkbox';
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

  function getToday() {
    return new Date().toISOString().split("T")[0];
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

      const newList = await response.json();

      if (!response.ok) {
        setError(newList.error || "Could not create list.");
        return;
      }

      setLists(prev => [...prev, newList]);
      setSelectedList(newList);
      setTasks([]);

      setListName("");
      setShowListDialog(false);
    } catch {
      setError("Could not connect to the server.");
    }
  }

  async function handleCreateTask(e) {
    e.preventDefault();

    setError("");

    if (!selectedList) {
      setError("Please select a list first.");
      return;
    }

    if (!taskTitle.trim()) {
      setError("Please enter a task title.");
      return;
    }

    try {
      const response = await authenticatedFetch(
        `http://localhost:8000/api/lists/${selectedList.id}/tasks/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: taskTitle,
            deadline: taskDeadline || getToday(),
            description: "",
            completed: false,
          }),
        }
      );

      const newTask = await response.json();

      if (!response.ok) {
        setError(newTask.error || "Could not create task.");
        return;
      }

      setTasks(prev => [...prev, newTask]);
      setTaskTitle("");
      setTaskDeadline("");
      setShowTaskModal(false);
    } catch {
      setError("Server unavailable.");
    }
  }

  async function toggleTask(task) {
    try {
      const response = await authenticatedFetch(
        `http://localhost:8000/api/tasks/${task.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: task.title,
            deadline: task.deadline,
            completed: !task.completed,
            completed_at: !task.completed
              ? new Date().toISOString().split("T")[0]
              : null,
            todo_list: task.todo_list,
          }),
        }
      );

      const updatedTask = await response.json();

      if (!response.ok) {
        setError("Could not update task.");
        return;
      }

      setTasks(prev =>
        prev.map(t => t.id === updatedTask.id ? updatedTask : t)
      );

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
                onClick={() => {
                  setTaskDeadline(getToday());
                  setTaskTitle("");
                  setShowTaskModal(true);
                }}
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
                <div>
                  {tasks.map(task => (
                    <div
                      key={task.id}
                      className={`tasks-list ${task.completed ? "task-completed" : ""
                        }`}
                    >
                      <div className=" task-item">
                        <button
                          type="button"
                          className={`complete-button ${task.completed ? "completed" : ""}`}
                          onClick={() => toggleTask(task)}
                        >
                          {task.completed ? <i className="pi pi-check"></i> : <i className="pi"></i>}
                        </button>
                        <div
                          className="tasks-name"
                          style={{
                            textDecoration: task.completed ? "line-through" : "none",
                            opacity: task.completed ? 0.8 : 1,
                          }}
                        >
                          {task.title}
                        </div>
                        <div className="tasks-deadline">
                          {task.deadline}
                        </div>
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
      </div >
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
                type="date"
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
    </div >
  );
}