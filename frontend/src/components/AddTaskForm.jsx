import { useState } from "react";

export default function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("low");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsLoading(true);
    const token = localStorage.getItem("token");

    await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
        dueDate,
        priority,
      }),
    });

    setTitle("");
    setPriority("low");
    setIsLoading(false);
    onAdd();
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-4 sm:mb-6 px-2 sm:px-0">
      <div className="bg-slate-800/90 backdrop-blur rounded-2xl shadow-xl border border-slate-700">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-white">Add New Task</h2>
          <p className="text-sm text-slate-400">
            Stay organized by adding tasks with priority and due dates
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          <input
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 transition"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            rows="3"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 transition resize-none"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="date"
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 transition"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 transition cursor-pointer"
            >
              <option value="low">🟢 Low Priority</option>
              <option value="medium">🟡 Medium Priority</option>
              <option value="high">🔴 High Priority</option>
            </select>
          </div>

          <div className="flex justify-center sm:justify-end">
            <button
              type="submit"
              disabled={isLoading || !title.trim()}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
