import { useEffect, useState } from "react";

export default function TaskList({ refresh, filter }) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({
        title: "",
        description: "",
        dueDate: "",
    });

    const fetchTasks = async () => {
        setLoading(true);
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/tasks", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();
        setTasks(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchTasks();
    }, [refresh]);

    const toggleComplete = async (task) => {
        const token = localStorage.getItem("token");

        await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ completed: !task.completed }),
        });

        fetchTasks();
    };

    const deleteTask = async (id) => {
        const token = localStorage.getItem("token");

        await fetch(`http://localhost:5000/api/tasks/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        fetchTasks();
    };

    const startEdit = (task) => {
        setEditingId(task._id);
        setEditData({
            title: task.title,
            description: task.description || "",
            dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
        });
    };

    const saveEdit = async (id) => {
        const token = localStorage.getItem("token");

        await fetch(`http://localhost:5000/api/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(editData),
        });

        setEditingId(null);
        fetchTasks();
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;
    });

    // 🔹 SORT BY DUE DATE
    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
    });

    const getPriorityStyle = (priority) => {
        switch (priority) {
            case "high":
                return "bg-red-500 text-white";
            case "medium":
                return "bg-amber-500 text-white";
            case "low":
                return "bg-emerald-500 text-white";
            default:
                return "bg-slate-500 text-white";
        }
    };

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case "high": return "🔴";
            case "medium": return "🟡";
            case "low": return "🟢";
            default: return "⚪";
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
            </div>
        );
    }

    if (sortedTasks.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-2xl font-semibold text-slate-300 mb-2">No tasks found</h3>
                <p className="text-slate-400">Start by adding your first task above!</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-4">
            {sortedTasks.map(task => (
                <div
                    key={task._id}
                    className={`bg-slate-800 rounded-xl shadow-lg border-l-4 ${
                        task.completed
                            ? "border-emerald-500 opacity-75"
                            : task.priority === "high"
                            ? "border-red-500"
                            : task.priority === "medium"
                            ? "border-amber-500"
                            : "border-emerald-500"
                    }`}
                >
                    <div className="p-3 sm:p-5">
                        {editingId === task._id ? (
                            <div className="space-y-2">
                                <input
                                    className="w-full p-2 rounded bg-slate-700 text-white"
                                    value={editData.title}
                                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                />

                                <textarea
                                    className="w-full p-2 rounded bg-slate-700 text-white"
                                    placeholder="Description"
                                    value={editData.description}
                                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                />

                                <input
                                    type="date"
                                    className="p-2 rounded bg-slate-700 text-white"
                                    value={editData.dueDate}
                                    onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
                                />

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => saveEdit(task._id)}
                                        className="flex-1 xs:flex-none px-2 sm:px-4 py-2 text-xs sm:text-sm bg-amber-500 hover:bg-amber-600 text-white rounded transition"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditingId(null)}
                                        className="px-4 py-2 bg-slate-600 text-white rounded"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                <div className="flex-1">
                                    <h3 className={`text-base sm:text-lg font-semibold ${task.completed ? "line-through text-slate-500" : "text-white"}`}>
                                        {task.title}
                                    </h3>

                                    {task.description && (
                                        <p className="text-xs sm:text-sm text-slate-400 mt-1 break-words">
                                            {task.description}
                                        </p>
                                    )}

                                    {task.dueDate && (
                                        <p className="text-xs text-blue-400 mt-1">
                                            Due: {new Date(task.dueDate).toLocaleDateString()}
                                        </p>
                                    )}

                                    <span className={`inline-block mt-2 text-xs font-bold px-3 py-1 rounded-full ${getPriorityStyle(task.priority)}`}>
                                        {getPriorityIcon(task.priority)} {task.priority.toUpperCase()}
                                    </span>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-0">
                                    <button
                                        onClick={() => toggleComplete(task)}
                                        className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-emerald-500 hover:bg-emerald-600 text-white rounded transition"
                                    >
                                        {task.completed ? "Undo" : "Done"}
                                    </button>

                                    <button
                                        onClick={() => startEdit(task)}
                                        className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-amber-500 hover:bg-amber-600 text-white rounded transition"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => deleteTask(task._id)}
                                        className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-red-500 hover:bg-red-600 text-white rounded transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
