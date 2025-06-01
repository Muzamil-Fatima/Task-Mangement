// Load saved tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to display tasks
function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear existing tasks

    tasks.forEach((task, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.name}</td>
            <td>${task.dueDate}</td>
            <td>${task.completed ? '<span class="completed-icon">&#10003;</span>' : 'Pending'}</td>
            <td>
                <button onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </td>
        `;
        taskList.appendChild(row);
    });
}

// Function to add a new task
function addTask(event) {
    event.preventDefault(); // Prevent form from reloading the page

    const taskInput = document.getElementById('taskInput').value;
    const dueDate = document.getElementById('dueDate').value;

    if (taskInput.trim() !== "") {
        tasks.push({ name: taskInput, dueDate: dueDate, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        document.getElementById('taskInput').value = ""; // Clear the input
        document.getElementById('dueDate').value = ""; // Clear the date
        displayTasks(); // Refresh the task list
    }
}

// Function to toggle task completion
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks(); // Refresh the task list
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1); // Remove task from array
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks(); // Refresh the task list
}

// Event listener for the form submission
document.getElementById('taskForm').addEventListener('submit', addTask);

// Display tasks when the page loads
document.addEventListener('DOMContentLoaded', displayTasks);
