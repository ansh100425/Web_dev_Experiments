const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
// app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Task Schema (Matching the Assignment Table) [cite: 49]
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true }, // [cite: 49, 68]
    priority: { type: String, default: 'Medium' }, // [cite: 49]
    isDone: { type: Boolean, default: false }, // [cite: 49]
    createdAt: { type: Date, default: Date.now } // [cite: 49]
});

const Task = mongoose.model('Task', taskSchema);

// API Endpoints [cite: 51]

// GET /tasks: Return all tasks [cite: 53, 75]
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /tasks: Add new task [cite: 54, 74]
app.post('/tasks', async (req, res) => {
    try {
        const { title, priority } = req.body;
        if (!title) return res.status(400).json({ error: "Title is required" }); // [cite: 68]
        const newTask = new Task({ title, priority });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// PUT /tasks/:id: Update task title/priority [cite: 55, 76]
app.put('/tasks/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTask);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// PATCH /tasks/:id/status: Toggle completed status [cite: 56, 77]
app.patch('/tasks/:id/status', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        task.isDone = !task.isDone;
        await task.save();
        res.json(task);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// DELETE /tasks/:id: Delete task [cite: 57, 78]
app.delete('/tasks/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted successfully" });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
