## Technical Requirements

- React (JavaScript / TypeScript)
- Django
- Gitlab
- Node.js
- PostgreSQL

## Task Properties

- Title: string
- ID: unique
- Description: string
- Deadline: dd.mm.yyyy hh:mm
- Status: complete / active

## User Interface (high-level)

- Homepage: displays the lists of the user (if user is logged in)
- Register page: displays field for username, email, and password
- Sign in page: displays field for username and password
- List page: displays all tasks in the specific list
- Task details page: displays full description, due date, and edit / delete options
- Add / Edit modal: creating or editing task
- Settings: notificaitons, theme for appliccation 

## Functional Requirements

| ID   | Feature               | Description                                                                                                  |
| ---- | --------------------- | ------------------------------------------------------------------------------------------------------------ |
| FR1  | Register User         | User should be able to register.                                                                             |
| FR2  | Authenticate User     | User should be able to log in.                                                                               |
| FR3  | View Lists            | Only authenticated user can view their own lists.                                                            |
| FR4  | Create Task           | Only authenticated user can create tasks with title, description, and possible deadline.                     |
| FR5  | Delete Task           | User can delete task.                                                                                        |
| FR6  | Edit Task             | User can edit task title, description and deadline.                                                          |
| FR7  | Reprioritize          | User can drag and drop tasks to move them up and down in the list.                                           |
| FR8  | Mark as Complete      | User can mark a task as complete, which removes the task from the To-Do list and stores it in a "Done" list. |
| FR9  | Permanently delete    | The tasks in the archived list should be removed manually by the user to be deleted permanently.             |
| FR10 | Multiple Lists        | User can create multiple lists.                                                                              |
| FR11 | Responsive Design     | The user interface should be usable on a laptop screen as well as on a mobile device.                        |
| FR12 | Toast Alerts          | There should be an alert for each task created / edited / deleted.                                           |
| FR13 | Confirmation Popup    | There should be a confirmation message popup for deleting a task.                                            |
| FR14 | Order Chronologically | The lists should be organized by deadline chronologically.                                                   |

**Optional**

| ID   | Feature       | Description                                                   |
| ---- | ------------- | ------------------------------------------------------------- |
| FR15 | Reminder      | Reminder 1h, 30min, and 15min before the due date.            |
| FR16 | Theme         | The user can change the theme of the app.                     |
| FR17 | Collaboration | Several users can add / edit / remove tasks in a shared list. |

## Non-functional Requirements

| ID   | Requirement | Description                                                                                                     |
| ---- | ----------- | --------------------------------------------------------------------------------------------------------------- |
| NFR1 | Usability   | Interface should be clean, intuitive, and fast to use.                                                          |
| NFR2 | Performance | Operations should occur within 1 second.                                                                        |
| NFR3 | Reliability | Data must persist for user accounts.                                                                            |
| NFR4 | Security    | User data must be protected with authentication.                                                                |
| NFR5 | Scalability | The application should be able to handle hundreds of tasks per user without noticeable decrease of performance. |
