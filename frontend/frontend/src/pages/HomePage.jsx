import "../styles/HomePage.css";
import { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
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

  const [editingTask, setEditingTask] = useState(null);
  const [editingList, setEditingList] = useState(null);

  const [editingListId, setEditingListId] = useState(null);
  const [editingListName, setEditingListName] = useState("");

  const [taskFilter, setTaskFilter] = useState("all");

  const filterOptions = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
  ];

  const filteredTasks = tasks.filter(task => {
    switch (taskFilter) {
      case "active":
        return !task.completed;
      case "completed":
        return task.completed;
      default:
        return true;
    }
  });

  function handleEditTask(task) {
    setEditingTask(task);
    setTaskTitle(task.title);
    setTaskDeadline(task.deadline);
    setShowTaskModal(true);
  }

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
      const isEditing = editingList !== null;

      const response = await authenticatedFetch(
        isEditing
          ? `http://localhost:8000/api/lists/${editingList.id}/`
          : "http://localhost:8000/api/lists/",
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: listName,
          }),
        }
      );

      const list = await response.json();

      if (!response.ok) {
        setError(list.error || "Could not save list.");
        return;
      }

      if (isEditing) {
        setLists(prev =>
          prev.map(l => l.id === list.id ? list : l)
        );

        if (selectedList?.id === list.id) {
          setSelectedList(list);
        }
      } else {
        setLists(prev => [...prev, list]);
        setSelectedList(list);
        setTasks([]);
      }

      setEditingList(null);
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
      const isEditing = editingTask !== null;

      const response = await authenticatedFetch(
        isEditing
          ? `http://localhost:8000/api/tasks/${editingTask.id}/`
          : `http://localhost:8000/api/lists/${selectedList.id}/tasks/`,
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: taskTitle,
            deadline: taskDeadline || getToday(),
            completed: isEditing ? editingTask.completed : false,
            completed_at: isEditing ? editingTask.completed_at : null,
            todo_list: selectedList.id,
          }),
        }
      );

      const task = await response.json();

      if (!response.ok) {
        setError(task.error || "Could not save task.");
        return;
      }

      if (isEditing) {
        setTasks(prev =>
          prev.map(t => t.id === task.id ? task : t)
        );
      } else {
        setTasks(prev => [...prev, task]);
      }

      setEditingTask(null);
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

  async function deleteTask(taskId) {
    try {
      const response = await authenticatedFetch(
        `http://localhost:8000/api/tasks/${taskId}/`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        setError("Could not delete task.");
        return;
      }

      setTasks(prev => prev.filter(task => task.id !== taskId));
    } catch {
      setError("Server unavailable.");
    }
  }

  async function deleteList(listId) {
    try {
      const response = await authenticatedFetch(
        `http://localhost:8000/api/lists/${listId}/`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        setError("Could not delete list.");
        return;
      }

      setLists(prev => prev.filter(list => list.id !== listId));
    } catch {
      setError("Server unavailable.");
    }
  }

  function startEditingList(list) {
    setEditingListId(list.id);
    setEditingListName(list.name);
  }

  async function saveListName() {
    if (!editingListName.trim()) {
      setEditingListId(null);
      return;
    }

    try {
      const response = await authenticatedFetch(
        `http://localhost:8000/api/lists/${editingListId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editingListName,
          }),
        }
      );

      const updatedList = await response.json();

      if (!response.ok) {
        setError(updatedList.error || "Could not update list.");
        return;
      }

      setLists(prev =>
        prev.map(list =>
          list.id === updatedList.id ? updatedList : list
        )
      );

      if (selectedList?.id === updatedList.id) {
        setSelectedList(updatedList);
      }

      setEditingListId(null);
      setEditingListName("");

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
        <div className="sidebar-left">
          <div className="window">
            <div className="window-title">
              Lists
            </div>
            <div className="window-content">
              {lists.length === 0 ? (
                <div className="empty-message">
                  No lists found
                </div>
              ) : (
                <div className="list-container">
                  {lists.map((list) => (
                    <div
                      key={list.id}
                      className="lists-items"
                    >
                      {editingListId === list.id ? (
                        <input
                          autoFocus
                          className="pixel-input edit-field"
                          value={editingListName}
                          onChange={(e) => setEditingListName(e.target.value)}
                          onBlur={saveListName}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveListName();
                            if (e.key === "Escape") {
                              setEditingListId(null);
                              setEditingListName("");
                            }
                          }}
                        />
                      ) : (
                        <button
                          className="menu-button"
                          onClick={() => {
                            setSelectedList(list);
                            loadTasks(list.id);
                          }}
                        >
                          {list.name}
                        </button>
                      )}

                      <button
                        className="edit-button"
                        onClick={() => startEditingList(list)}
                      >
                        <i className="pi pi-pencil"></i>
                      </button>

                      <button
                        className="delete-button"
                        onClick={() => deleteList(list.id)}
                      >
                        <i className="pi pi-trash"></i>
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <button
                className="action-button"
                onClick={() => {
                  setEditingList(null);
                  setListName("");
                  setShowListDialog(true);
                }}
              >
                + New List
              </button>
            </div>
          </div>

        </div>
        <main className="content">
          <div className="window large-window">
            <div className="window-title filter-dropdown">
              <div className="lists-items">
                {selectedList ? selectedList.name : "Current List"}
              </div>
              <Dropdown
                value={taskFilter}
                options={filterOptions}
                onChange={(e) => setTaskFilter(e.value)}
                placeholder="Filter tasks"
              />
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
              ) : filteredTasks.length === 0 ? (
                <div className="empty-message">
                  No tasks match the selected filter.
                </div>
              ) : (
                <div>
                  {filteredTasks.map(task => (
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
                        <button
                          className="edit-button"
                          onClick={() => handleEditTask(task)}
                        >
                          <i className="pi pi-pencil"></i>
                        </button>
                        <button
                          type="button"
                          className="delete-button"
                          aria-placeholder="Delete Task"
                          onClick={() => deleteTask(task.id)}
                        >
                          <i className="pi pi-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
        <div className="sidebar-right">
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
                Active:
              </div>
              <div className="stat-row">
                Done:
              </div>
            </div>
          </div>
        </div>
      </div >
      <Dialog
        header={editingTask ? "Edit Task" : "Add Task"}
        visible={showTaskModal}
        onHide={() => {
          setEditingTask(null);
          setShowTaskModal(false);
        }}
        draggable
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
                {editingTask ? "Save Changes" : "Create Task"}
              </button>
              <button
                type="button"
                className="warning-button"
                onClick={() => {
                  setEditingTask(null);
                  setTaskTitle("");
                  setTaskDeadline("");
                  setShowTaskModal(false);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Dialog>
      <Dialog
        header={editingList ? "Edit List" : "New List"}
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
                  {editingList ? "Save Changes" : "Create List"}
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