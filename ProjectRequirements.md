## Technical Requirements

- React (JavaScript / TypeScript), react router, react toastify, Prime React.
- vite
- Django
- Node.js
- SQLite

## Task Properties

- Title: string
- ID: unique
- Deadline: dd.mm.yyyy
- Status: complete / active

## User Interface (high-level)

- Homepage: displays the lists of the user (if user is logged in)
- Register page: displays field for username, email, and password
- Login page: displays field for username and password
- Add / Edit modal: creating or editing task
- Settings page: notifications, theme for application, change password, completed tasks.

## Functional Requirements

| ID   | Feature               | Description                                                                                                                            |
| ---- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| FR1  | Register User         | User should be able to register.                                                                                                       |
| FR2  | Authenticate User     | User should be able to log in.                                                                                                         |
| FR3  | Create Lists          | Only authenticated user can create lists.                                                                                              |
| FR4  | Create Task           | Only authenticated user can create tasks with title and deadline. Task has to belong to a list and cannot exist without a parent-list. |
| FR5  | Delete Task           | User can delete task.                                                                                                                  |
| FR6  | Edit Task             | User can edit task title, description and deadline.                                                                                    |
| FR7  | Mark as Complete      | User can mark a task as complete, which removes the task from the To-Do list and stores it in a "Completed" list.                      |
| FR8  | Multiple Lists        | User can create multiple lists.                                                                                                        |
| FR9  | Responsive Design     | The user interface should be usable on a laptop screen as well as on a mobile device.                                                  |
| FR10 | Toast Alerts          | There should be an alert for each task created / edited / deleted.                                                                     |
| FR11 | Confirmation Popup    | There should be a confirmation message popup for deleting a task.                                                                      |
| FR12 | Order Chronologically | The lists should be organized by deadline chronologically.                                                                             |
| FR13 | Delete List           | Only authenticated users can delete their lists.                                                                                       |
| FR14 | Edit List             | Edit list name.                                                                                                                        |


**Optional**

| ID   | Feature         | Description                                                   |
| ---- | --------------- | ------------------------------------------------------------- |
| FR15 | Reminder        | Reminder 1h, 30min, and 15min before the due date.            |
| FR16 | Theme           | The user can change the theme of the app.                     |
| FR17 | Collaboration   | Several users can add / edit / remove tasks in a shared list. |
| FR18 | Password Change | An authenticated user can change their password.              |

## Non-functional Requirements

| ID   | Requirement   | Description                                                                                                     |
| ---- | ------------- | --------------------------------------------------------------------------------------------------------------- |
| NFR1 | Usability     | Interface should be clean, intuitive, and fast to use.                                                          |
| NFR2 | Performance   | Operations should occur within 1 second.                                                                        |
| NFR3 | Reliability   | Data must persist for user accounts.                                                                            |
| NFR4 | Security      | User data must be protected with authentication.                                                                |
| NFR5 | Scalability   | The application should be able to handle hundreds of tasks per user without noticeable decrease of performance. |
| NFR6 | Accessibility | Interface should be accessible to anyone, including people with visual impairments.                             |
