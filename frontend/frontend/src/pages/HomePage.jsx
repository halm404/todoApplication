import "../styles/HomePage.css";

export default function HomePage() {
  return (
    <div className="homepage">

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

              <button className="action-button">
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

              <div>
                <button className="action-button">
                  + New Task
                </button>
              </div>

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

    </div>
  );
}