# Backend

### Setup

- cd into `BACKEND/`
- Install dependencies: `npm install`
- Create `.env` with at least:

```
PORT=5000
MONGO_URI=<your-mongo-uri>
JWT_SECRET=<secret>
```

Server base URL: `http://localhost:5000`

---

## Routes Reference (summary)

All protected routes require the `Authorization: Bearer <token>` header.

1) Landing
- GET `/landing` — public

2) User
- POST `/user/register` — register new user
  - Request JSON:
    ```json
    { "name": "Alice", "email": "a@x.com", "password": "secret" }
    ```
  - Response: 201 created user (sanitized, no password)

- POST `/user/login` — login
  - Request JSON:
    ```json
    { "email": "a@x.com", "password": "secret" }
    ```
  - Response: JWT token + user info

- GET `/user` — get all users (protected)
- POST `/user/logout` — logout (protected)
- DELETE `/user/deleteMe` — delete own account (protected)

3) Profile
- GET `/profile` — get current user profile (protected)
- PUT `/profile/update` — update profile (protected)
- PUT `/profile/resetPassword` — change password (protected)

4) Project
- POST `/project/create` — create project (protected)
  - Request JSON (examples):
    ```json
    {
      "name": "School Campaign",
      "description": "Coordinate drives",
      "members": ["507f1f77bcf86cd799439013"],
      "deadLine": "2026-04-01T00:00:00.000Z"
    }
    ```
  - Notes: server always adds the creator as `Admin` in `members`.

- GET `/project/myProjects` — get projects where user is owner or member (protected)
- GET `/project/:id` — get project details (protected)
- PUT `/project/:id` — update project (owner only)

Project schema (important fields):

| Field | Type | Notes |
|---|---|---|
| `name` | String | required |
| `description` | String | optional |
| `owner` | ObjectId -> `User` | required |
| `members` | [{ user: ObjectId, role: Enum }] | roles: `Admin`, `Editor`, `Viewer` |
| `startDate` | Date | default now |
| `deadLine` | Date | optional |
| `status` | String | enum: `active`, `onGoing`, `completed`, `droped`, `holdOn` |

5) Workspace
- POST `/workspace/create` — create workspace (protected)
  - Request JSON:
    ```json
    { "name": "Marketing", "description": "Team workspace" }
    ```

6) Task
- All task routes are mounted under `/tasks`.

- POST `/tasks/:projectId/create` — create task in a project (protected)
  - Request JSON:
    ```json
    {
      "title": "Design poster",
      "description": "A3 poster for event",
      "dueDate": "2026-03-10T00:00:00.000Z",
      "priority": "high",
      "tags": ["design","urgent"]
    }
    ```
  - Permission: project owner or member

- GET `/tasks/:projectId` — list tasks for a project (protected)
- GET `/tasks/task/:taskId` — get single task (protected)
- PUT `/tasks/:taskId` — update task (protected; owner/member)
- PUT `/tasks/:taskId/assign` — assign/reassign task (protected; owner/member)
- GET `/tasks/my-tasks` — tasks assigned to current user (protected)
- GET `/tasks/:projectId/status/:status` — filter by status `todo|pending|completed` (protected)
- DELETE `/tasks/:taskId` — delete task (project owner only)

Task schema (important fields):

| Field | Type | Notes |
|---|---|---|
| `title` | String | required |
| `description` | String | optional |
| `project` | ObjectId -> `Project` | required |
| `assignedTo` | ObjectId -> `User` | optional |
| `dueDate` | Date | optional |
| `status` | String | enum: `todo`,`pending`,`completed` (default: `todo`) |
| `priority` | String | enum: `low`,`medium`,`high` (default: `medium`) |
| `tags` | [String] | optional |

7) Notifications
- All notification routes are mounted under `/notifications` (protected).

- GET `/notifications/` — list notifications for current user (protected)
- GET `/notifications/unread/count` — get unread notifications count (protected)
- GET `/notifications/:id` — get single notification (protected)
- POST `/notifications/` — send/create a notification (protected)
  - Example body:
    ```json
    {
      "toUser": "64a1f2e9a0b1c2d3e4f56789",
      "title": "New Task Assigned",
      "message": "You were assigned to task 'Design mockups'.",
      "data": { "taskId": "60f1a2b3c4d5e6f7a8b9c0d", "projectId": "70a1b2c3d4e5f6g7h8i9j0k" }
    }
    ```
- PATCH `/notifications/:id/read` — mark a notification as read (protected)
- PATCH `/notifications/markAllRead` — mark all notifications as read for current user (protected)
- DELETE `/notifications/:id` — delete a notification (protected)

Example curl to send a notification:

```bash
curl -X POST http://localhost:5000/notifications/ \\
  -H "Authorization: Bearer <TOKEN>" \\
  -H "Content-Type: application/json" \\
  -d '{"toUser":"64a1f2e9a0b1c2d3e4f56789","title":"New Task Assigned","message":"Please check the task.","data":{"taskId":"60f1a2b3c4d5e6f7a8b9c0d"}}'
```

---

## Examples

- Create Project (POST `/project/create`):

Request body:

```json
{
  "name": "School Campaign23",
  "description": "This project is to co-ordinate the drives in the school",
  "members": [
    { "user": "507f1f77bcf86cd799439013", "role": "Editor" }
  ]
}
```

Response (201/200):

```json
{
  "message": "new project created!",
  "name": "School Campaign23",
  "createdAt": "2026-03-03T08:13:28.887Z",
  "owner": { "_id": "69a69a3615cc6023a2337055", "name": "harsha vardhan" },
  "members": [ { "user": "507f1f77bcf86cd799439013", "role": "Editor", "_id": "..." } ]
}
```

---

If you want, I can:

- Add a `BACKEND/routes/taskRoutes.js` file wired to `controllers/taskController.js`.
- Add example cURL commands for each endpoint.

Update requested by frontend team: let me know which examples you want first (project, task, or user). 
