const API_URL = 'http://localhost:5000/tasks';

// DOM Elements
const taskTitle = document.getElementById('taskTitle');
const taskPriority = document.getElementById('taskPriority');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');

let currentFilter = 'all';

// Load tasks on startup
window.addEventListener('load', fetchTasks);

async function fetchTasks() {
    const res = await fetch(API_URL);
    const tasks = await res.json();
    renderTasks(tasks);
}

addTaskBtn.addEventListener('click', async () => {
    const title = taskTitle.value.trim();
    if (!title) return alert("Title is required!"); // Validation [cite: 68]
    
    const newTask = { title, priority: taskPriority.value };
    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
    });
    taskTitle.value = '';
    fetchTasks();
});

function renderTasks(tasks) {
    taskList.innerHTML = '';
    let filtered = tasks;
    if (currentFilter === 'active') filtered = tasks.filter(t => !t.isDone);
    if (currentFilter === 'completed') filtered = tasks.filter(t => t.isDone);

    filtered.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <div class="task-info ${task.isDone ? 'completed' : ''}">
                <input type="checkbox" ${task.isDone ? 'checked' : ''} onchange="toggleStatus('${task._id}')">
                <span>${task.title}</span> 
                <small class="priority-${task.priority}">[${task.priority}]</small>
            </div>
            <div>
                <button onclick="editTask('${task._id}', '${task.title}')">Edit</button>
                <button onclick="deleteTask('${task._id}')">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
    updateCounters(tasks);
}

async function toggleStatus(id) {
    await fetch(`${API_URL}/${id}/status`, { method: 'PATCH' });
    fetchTasks();
}

async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTasks();
}

async function editTask(id, oldTitle) {
    const newTitle = prompt("Edit Task Title:", oldTitle);
    if (newTitle) {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTitle })
        });
        fetchTasks();
    }
}

function updateCounters(tasks) {
    document.getElementById('totalCount').innerText = tasks.length;
    document.getElementById('completedCount').innerText = tasks.filter(t => t.isDone).length;
}

// Filter logic
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        fetchTasks();
    });
});