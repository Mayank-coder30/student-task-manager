import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
}


function TaskPage() {
  const [refresh, setRefresh] = useState(false);
  const [filter, setFilter] = useState("all");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      
      <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 pt-6 sm:pt-8 md:pt-12 pb-6 sm:pb-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3">
            Your Tasks
          </h1>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg">Organize your day, achieve your goals</p>
        </div>

        <div className="mb-8">
          <AddTaskForm onAdd={() => setRefresh(!refresh)} />
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          {[
            { value: "all", label: "All Tasks", icon: "📋" },
            { value: "pending", label: "Pending", icon: "⏳" },
            { value: "completed", label: "Completed", icon: "✅" }
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg ${
                filter === f.value
                  ? "bg-amber-500 text-white"
                  : "bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700"
              }`}
            >
              <span className="mr-2">{f.icon}</span>
              {f.label}
            </button>
          ))}
        </div>

        <TaskList refresh={refresh} filter={filter} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <TaskPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
