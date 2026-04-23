const API_URL = '/api/tasks';

// DOM Elements
const taskForm = document.getElementById('add-task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const taskCountSpan = document.getElementById('task-count');
const filterBtns = document.querySelectorAll('.filter-btn');

let currentFilter = 'all'; // all, active, completed

// Initialize
document.addEventListener('DOMContentLoaded', fetchTasks);

// Event Listeners
taskForm.addEventListener('submit', addTask);
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

let state = {
    tasks: []
};

// API Functions
async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        state.tasks = await response.json();
        renderTasks();
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

async function addTask(e) {
    e.preventDefault();
    const title = taskInput.value.trim();
    
    if (!title) return;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title })
        });
        
        if (response.ok) {
            const newTask = await response.json();
            state.tasks.push(newTask);
            taskInput.value = '';
            renderTasks();
        }
    } catch (error) {
        console.error('Error adding task:', error);
    }
}

async function toggleTask(id, completed) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed })
        });

        if (response.ok) {
            const index = state.tasks.findIndex(t => t.id === id);
            if (index !== -1) {
                state.tasks[index].completed = completed;
                renderTasks();
            }
        }
    } catch (error) {
        console.error('Error toggling task:', error);
    }
}

async function updateTask(id, title) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title })
        });

        if (response.ok) {
            const index = state.tasks.findIndex(t => t.id === id);
            if (index !== -1) {
                state.tasks[index].title = title;
                renderTasks();
            }
        }
    } catch (error) {
        console.error('Error updating task:', error);
    }
}

async function deleteTask(id, element) {
    try {
        element.classList.add('removing');
        
        // Wait for animation
        setTimeout(async () => {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                state.tasks = state.tasks.filter(t => t.id !== id);
                renderTasks();
            }
        }, 300); // Matches CSS animation duration
    } catch (error) {
        console.error('Error deleting task:', error);
        element.classList.remove('removing');
    }
}

// UI Functions
function renderTasks() {
    taskList.innerHTML = '';
    
    let filteredTasks = state.tasks;
    if (currentFilter === 'active') {
        filteredTasks = state.tasks.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = state.tasks.filter(t => t.completed);
    }

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.dataset.id = task.id;

        li.innerHTML = `
            <div class="checkbox-container">
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <div class="checkmark"></div>
            </div>
            <div class="task-content">
                <span class="task-text">${escapeHTML(task.title)}</span>
                <input type="text" class="edit-input" value="${escapeHTML(task.title)}">
            </div>
            <button class="delete-btn" aria-label="Delete">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
            </button>
        `;

        // Event Listeners for the item
        const checkbox = li.querySelector('.task-checkbox');
        checkbox.addEventListener('change', (e) => toggleTask(task.id, e.target.checked));

        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteTask(task.id, li));

        // Inline Editing
        const taskText = li.querySelector('.task-text');
        const editInput = li.querySelector('.edit-input');

        taskText.addEventListener('dblclick', () => {
            li.classList.add('editing');
            editInput.focus();
            // Move cursor to end
            const val = editInput.value;
            editInput.value = '';
            editInput.value = val;
        });

        const finishEditing = () => {
            if (!li.classList.contains('editing')) return;
            li.classList.remove('editing');
            const newTitle = editInput.value.trim();
            if (newTitle && newTitle !== task.title) {
                updateTask(task.id, newTitle);
            } else {
                editInput.value = task.title; // Revert
            }
        };

        editInput.addEventListener('blur', finishEditing);
        editInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                finishEditing();
            } else if (e.key === 'Escape') {
                li.classList.remove('editing');
                editInput.value = task.title;
            }
        });

        taskList.appendChild(li);
    });

    updateCounter();
}

function updateCounter() {
    const activeTasks = state.tasks.filter(t => !t.completed).length;
    taskCountSpan.textContent = activeTasks;
}

// Utility to prevent XSS
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}
