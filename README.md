# Full-Stack CRUD Task Manager

A full-stack web application with CRUD functionality built using:

- Node.js + Express (REST API)
- React + Vite (frontend)
- MongoDB + Mongoose (database)

## Project Structure

```text
.
|-- client/   # React frontend
`-- server/   # Express API
```

## Features

- Create a task
- Read all tasks
- Update task title/description/status
- Delete task
- Responsive UI connected to live backend API

## Backend Setup (Express + MongoDB)

1. Go to the server folder:

```bash
cd server
```

2. Create your environment file:

```bash
cp .env.example .env
```

Set `MONGO_URI` in `server/.env` using one of these options:

- Local MongoDB:

```env
MONGO_URI=mongodb://127.0.0.1:27017/task_manager_db
```

- MongoDB Atlas:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/task_manager_db?retryWrites=true&w=majority
```

3. Install dependencies (if needed):

```bash
npm install
```

4. Run the API:

```bash
npm run dev
```

Server runs on `http://localhost:5000`.

### API Endpoints

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get one task
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task 

## Frontend Setup (React)

1. Open a new terminal and go to client:

```bash
cd client
```

2. Create environment file:

```bash
cp .env.example .env
```

`VITE_API_BASE_URL` can stay empty when using the Vite proxy in `client/vite.config.js`.
Only set it if you want to call a different API host directly.

3. Install dependencies (if needed):

```bash
npm install
```

4. Start frontend:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173` and proxies `/api` to the backend.

## Example Task Payload

```json
{
  "title": "Build CRUD app",
  "description": "Create backend API and connect React frontend",
  "completed": false
}
```

## Troubleshooting

- `MongoDB connection error: The uri parameter ... undefined`
  - `server/.env` is missing or `MONGO_URI` is not set.
- `MongoDB connection error: bad auth : authentication failed`
  - Atlas username/password is incorrect, or IP is not allowed in Atlas Network Access.
- Frontend loads but API calls fail
  - Ensure backend is running on `http://localhost:5000` and keep Vite proxy config enabled.
