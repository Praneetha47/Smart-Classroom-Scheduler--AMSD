# SmartSched Backend — Setup Guide

## What You Need Installed First

1. **Node.js** → Download from https://nodejs.org (pick the LTS version)
2. **MongoDB** → Download from https://www.mongodb.com/try/download/community
   - Install it, then start it (it runs in the background)

---

## Step-by-Step Setup

### 1. Put the backend folder anywhere on your computer
For example: `C:\Users\YourName\smartsched-backend\`

### 2. Open a terminal (Command Prompt or VS Code terminal)
Navigate to your backend folder:
```
cd C:\Users\YourName\smartsched-backend
```

### 3. Install all packages
```
npm install
```

### 4. Start MongoDB
On Windows, MongoDB runs as a service automatically after install.
To check, open Task Manager → Services → look for "MongoDB".

On Mac/Linux:
```
brew services start mongodb-community
```

### 5. Start the backend server
```
npm run dev
```

You should see:
```
✅ MongoDB connected
🚀 Server running on http://localhost:5000
```

### 6. Test it works
Open your browser and go to:
```
http://localhost:5000
```
You should see: `{"message":"SmartSched API is running ✅"}`

---

## Connect Your React Frontend

### 1. Copy `api.js` into your React project
Put it at: `src/api.js`

### 2. Install axios in your frontend project
```
npm install axios
```

### 3. Update your Login page to use real auth
In `Login.jsx`, replace the simulated login with:
```js
import { login } from "../api";

const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);
  try {
    const res = await login({ username, password });
    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  } catch (err) {
    setError("Invalid username or password.");
    setLoading(false);
  }
};
```

---

## API Endpoints Reference

| Method | URL                     | What it does              | Auth needed? |
|--------|-------------------------|---------------------------|--------------|
| POST   | /api/auth/login         | Login, returns JWT token  | No           |
| GET    | /api/classrooms         | Get all classrooms        | No           |
| POST   | /api/classrooms         | Add a classroom           | Yes          |
| DELETE | /api/classrooms/:id     | Delete a classroom        | Yes          |
| GET    | /api/faculty            | Get all faculty           | No           |
| POST   | /api/faculty            | Add a faculty member      | Yes          |
| DELETE | /api/faculty/:id        | Delete faculty            | Yes          |
| GET    | /api/courses            | Get all courses           | No           |
| POST   | /api/courses            | Add a course              | Yes          |
| DELETE | /api/courses/:id        | Delete a course           | Yes          |
| GET    | /api/schedule           | Get all schedule entries  | No           |
| POST   | /api/schedule           | Add schedule (with conflict check) | Yes |
| DELETE | /api/schedule/:id       | Delete a schedule entry   | Yes          |

---

## Project File Structure

```
smartsched-backend/
├── server.js              ← Main entry point (run this)
├── .env                   ← Your settings (port, DB URL, secret)
├── package.json           ← Dependencies list
├── api.js                 ← Copy this to your React src/ folder
├── middleware/
│   └── auth.js            ← JWT token checker
├── models/
│   ├── Classroom.js       ← Classroom database schema
│   ├── Faculty.js         ← Faculty database schema
│   ├── Course.js          ← Course database schema
│   └── Schedule.js        ← Schedule database schema
└── routes/
    ├── auth.js            ← Login route
    ├── classrooms.js      ← Classroom CRUD routes
    ├── faculty.js         ← Faculty CRUD routes
    ├── courses.js         ← Courses CRUD routes
    └── schedule.js        ← Schedule CRUD + conflict detection
```

---

## Default Login
- **Username:** admin
- **Password:** admin123

---

## Common Problems & Fixes

| Problem | Fix |
|---------|-----|
| `MongoDB connection error` | Make sure MongoDB is running |
| `npm install` fails | Make sure Node.js is installed |
| Frontend can't connect | Make sure backend is running on port 5000 |
| `401 Unauthorized` errors | You're not logged in — login first to get a token |
| Port already in use | Change PORT in .env to 5001 |
