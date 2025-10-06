// DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(task => addTaskToDOM(task));

// Add Task Event
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText === '') return alert("Task cannot be empty!");

    const task = { text: taskText };
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    addTaskToDOM(task);
    taskInput.value = '';
});

// Function to add task to DOM
function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.className = 'task-item';

    const span = document.createElement('span');
    span.textContent = task.text;

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';
    editBtn.addEventListener('click', () => {
        const newText = prompt('Edit your task:', span.textContent);
        if (newText !== null && newText.trim() !== '') {
            span.textContent = newText.trim();
            task.text = newText.trim();
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    });

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', () => {
        taskList.removeChild(li);
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Optional: add task on Enter key
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTaskBtn.click();
});
