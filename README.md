# 🧑‍🎓 TaskMaster - Task Manager

A **full‑stack task management web application** built as an internship project. This app allows **multiple users** to securely manage their tasks with authentication, priorities, due dates, and a clean modern UI.

---

## 🚀 Live Features

### 🔐 Authentication

* User **Signup & Login**
* **JWT‑based authentication**
* Each user can only access **their own tasks**

### ✅ Task Management

* Create tasks with:

  * Title
  * Description
  * Priority (Low / Medium / High)
  * Due Date
* Edit existing tasks
* Mark tasks as **Completed / Pending**
* Delete tasks

### 🔍 Filtering & Sorting

* Filter tasks by:

  * All
  * Pending
  * Completed
* **Automatic sorting by due date** (earliest first)

### 🎨 UI & UX

* Modern **dark theme** UI
* Built with **Tailwind CSS**
* Responsive design (mobile & desktop)
* Loading indicators and empty‑state UI

---

## 🛠️ Tech Stack

### Frontend

* **React (Vite)**
* **Tailwind CSS**
* Fetch API
* JWT stored in Local Storage

### Backend

* **Node.js**
* **Express.js**
* **MongoDB** (Local / Atlas supported)
* **Mongoose**
* **JWT Authentication**

---

## 📂 Project Structure

```
student-task-manager/
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
|   |   |   ├── AddTaskForm.jsx
|   |   |   ├── Navbar.jsx
│   │   │   ├── TaskList.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/student-task-manager.git
cd student-task-manager
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/student-task-manager
JWT_SECRET=your_secret_key
```

Start backend server:

```bash
node server.js
```

Backend runs on: **[http://localhost:5000](http://localhost:5000)**

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: **[http://localhost:5173](http://localhost:5173)**

---

## 🧪 API Endpoints

### Auth

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| POST   | /api/auth/signup | Register user |
| POST   | /api/auth/login  | Login user    |

### Tasks (Protected)

| Method | Endpoint       | Description    |
| ------ | -------------- | -------------- |
| GET    | /api/tasks     | Get user tasks |
| POST   | /api/tasks     | Create task    |
| PUT    | /api/tasks/:id | Update task    |
| DELETE | /api/tasks/:id | Delete task    |

---

## 🔐 Authentication Flow

1. User logs in / signs up
2. Backend returns **JWT token**
3. Token stored in `localStorage`
4. Token sent via `Authorization: Bearer <token>`
5. Backend validates user for every request

---

## 📸 Screenshots

![alt text](<screenshots/Screenshot 2026-01-10 003422.png>)
![alt text](<screenshots/Screenshot 2026-01-10 003511.png>)
![alt text](<screenshots/Screenshot 2026-01-10 003546.png>)
![alt text](<screenshots/Screenshot 2026-01-10 003953.png>)
![alt text](<screenshots/Screenshot 2026-01-10 004108.png>)

---

## 🎯 Learning Outcomes

* Full‑stack MERN development
* JWT authentication & authorization
* REST API design
* MongoDB schema design
* Frontend‑backend integration
* Clean UI with Tailwind CSS

---

## 📌 Future Improvements

* Task search
* Pagination
* Email reminders
* Drag & drop reordering
* Dark/Light theme toggle

---

## 👨‍💻 Author

**Mayank**

Full-Stack Developer Intern

---

## ⭐ Acknowledgements

This project was built as part of an **internship learning experience** to strengthen real‑world full‑stack development skills.

If you like this project, consider giving it a ⭐ on GitHub!
