# Synchro
## 🎨 Frontend UI/UX Structure

### 1. Landing Page
* **Header Section:**
    * **Branding:** App Title (Syncro).
    * **Navigation:** Access to Login/Register.
    * **Slide Popup:** A "Three-lines" (Hamburger) menu containing Profile settings and **Logout functionality**.
* **Middle Section:**
    * **Hero Content:** A central landing text/quote about productivity.
    * **Call to Action:** "Get Started" button to drive user entry.
    * **Social Proof:** User statistics (e.g., "34,000+ users using Syncro").
* **Footer:**
    * Professional footer containing Title, Contact Info, and miscellaneous links.

### 2. Login / Register Page
* **Default State:** Displays the **Login Form**.
* **Toggle Logic:** Clean option to switch between Login and Register/Signup forms.
* **Aesthetics:** High-quality, interactive background with motivational text (e.g., *"You are just some steps away from building your future"*).

### 3. Dashboard
* **Personalization:** Welcome message (e.g., *"Good morning, <username>"*).
* **Project Views:** * View current active workspaces/projects.
    * View history of "Already worked" workspaces.
* **Management Actions:** * Create a new workspace.
    * Join a workspace via a unique **WorkspaceID**.
* **Workspaces Popup:** A scrolling list of cards showing:
    * Workspace Name, Short Description, and Date of Creation/Last Seen.

### 4. Workspace Page
The UI adapts based on the project status and user permissions:

* **Completed Workspace View:** Static view showing Title, Description, Teammembers, Team Leader info, and Date of Completion.
* **Active Workspace View (Kanban):** * Three distinct areas: **To-Do, Working On, Done**.
    * **Member Access:** View all tasks but only move/drag tasks assigned specifically to them.
    * **Manager/Leader Access:** Create new tasks and edit all task descriptions.

### 5. Task Interactions
* **Task Creation Form:** A popup modal where Leaders can enter Title, Description, Sub-tasks (Checkboxes), and Assignees.
* **Task Description Popup:** Detailed view for any user to see:
    * Full Title and Description.
    * Interactive Sub-task list with checkboxes.
    * "Assigned To" badge showing the specific user responsible.

---

## 🏗️ Backend Structure (Mongoose Models)

### User Model
| Field | Type | Description |
| :--- | :--- | :--- |
| `name` | String | Full name of the user |
| `email` | String | Unique email address |
| `password` | String | Encrypted password string |
| `workspaces` | Array | References to joined Workspaces |

### Workspace Model
| Field | Type | Description |
| :--- | :--- | :--- |
| `title` | String | Name of the workspace |
| `description` | String | Short summary of the project |
| `teamLeader` | ObjectId | Reference to the User who created it |
| `members` | Array | List of User IDs in the team |
| `status` | String | "Active" or "Completed" |
| `createdAt` | Date | Timestamp of creation |

### Task Model
| Field | Type | Description |
| :--- | :--- | :--- |
| `title` | String | Task name |
| `description` | String | Detailed task instructions |
| `subTasks` | Array | Objects containing `{ text: String, isDone: Boolean }` |
| `assignedTo` | ObjectId | Reference to the User performing the task |
| `category` | String | "todo", "workingOn", or "done" |