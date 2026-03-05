
# Task 1: Full-Stack CRUD Application (Task Manager)

This project is a full-stack CRUD web application built with:

- `Node.js + Express` for the backend REST API
- `React + Vite` for the frontend UI
- `MongoDB + Mongoose` for data storage

It satisfies the assignment requirement to build a complete CRUD app using Node.js/Express, React, and MongoDB.

## Requirement Coverage

1. Set up a back-end server with Express: `server/server.js`
2. Create a REST API for CRUD operations: `server/src/routes/taskRoutes.js`
3. Build a front-end with React that consumes the API: `client/src/App.jsx`
4. Use MongoDB to store data: `server/src/models/Task.js` + `server/src/config/db.js`

## Project Structure

```text
.
|-- client/   # React frontend (Vite)
`-- server/   # Express + MongoDB API
```

## CRUD Features

- Create task
- Read all tasks / single task
- Update task (title, description, completed)
- Delete task

## Backend Setup (Node.js + Express + MongoDB)

1. Go to backend folder:

```bash
cd server
```

2. Create environment file:

```bash
cp .env.example .env
```

3. Set database connection in `.env`:

```env
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
```

4. Install dependencies:

```bash
npm install
```

5. Run backend:

```bash
npm run dev
```

Backend URL: `http://localhost:5000`

## Frontend Setup (React)

1. Open a new terminal and go to frontend folder:

```bash
cd client
```

2. Create environment file:

```bash
cp .env.example .env
```

3. Install dependencies:

```bash
npm install
```

4. Start frontend:

```bash
npm run dev
```

Frontend URL: `http://localhost:5173`

Vite proxy forwards `/api` requests to `http://localhost:5000`.

## REST API Endpoints

- `GET /api/tasks` -> fetch all tasks
- `GET /api/tasks/:id` -> fetch single task
- `POST /api/tasks` -> create task
- `PUT /api/tasks/:id` -> update task
- `DELETE /api/tasks/:id` -> delete task

## Postman Testing

Base URL:

```text
http://localhost:5000/api/tasks
```

Example create request body:

```json
{
  "title": "Build full-stack CRUD app",
  "description": "Connect React UI to Express API",
  "completed": false
}
```
