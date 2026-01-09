import express from "express";
import Task from "../models/Task.js";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();
router.use(authMiddleware);


// CREATE
router.post("/", async (req, res) => {
  const task = await Task.create({
    ...req.body,
    userId: req.userId,
  });
  res.status(201).json(task);
});


// READ
router.get("/", async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    req.body,
    { new: true }
  );
  res.json(task);
});

//DELETE
router.delete("/:id", async (req, res) => {
  await Task.findOneAndDelete({
    _id: req.params.id,
    userId: req.userId,
  });
  res.json({ message: "Task deleted" });
});


export default router;
