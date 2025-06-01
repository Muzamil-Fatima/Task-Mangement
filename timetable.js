// Load saved subjects from local storage
let subjects = JSON.parse(localStorage.getItem('subjects')) || [];

// Function to display subjects
function displaySubjects() {
    const subjectList = document.getElementById('subjectList');
    subjectList.innerHTML = ''; // Clear existing subjects

    subjects.forEach((subject, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${subject.name}</td>
            <td>${subject.startTime}</td>
            <td>${subject.endTime}</td>
            <td>${subject.completed ? '<span class="completed-icon">&#10003;</span>' : 'Pending'}</td>
            <td>
                <button onclick="toggleComplete(${index})">${subject.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="deleteSubject(${index})">Delete</button>
            </td>
        `;
        subjectList.appendChild(row);
    });
}

// Function to add a new subject
function addSubject(event) {
    event.preventDefault(); // Prevent form from reloading the page

    const subjectInput = document.getElementById('subjectInput').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;

    if (subjectInput.trim() !== "") {
        const newSubject = { name: subjectInput, startTime: startTime, endTime: endTime, completed: false };
        subjects.push(newSubject);
        localStorage.setItem('subjects', JSON.stringify(subjects));
        document.getElementById('subjectInput').value = ""; // Clear the input
        document.getElementById('startTime').value = ""; // Clear start time
        document.getElementById('endTime').value = ""; // Clear end time
        displaySubjects(); // Refresh the subject list

        scheduleNotifications(newSubject); // Schedule notifications for this subject
    }
}

// Function to schedule notifications
function scheduleNotifications(subject) {
    const now = new Date();
    const startTime = new Date(now.toDateString() + ' ' + subject.startTime);
    const endTime = new Date(now.toDateString() + ' ' + subject.endTime);

    // Calculate delay for start time notification
    const startDelay = startTime.getTime() - now.getTime();
    if (startDelay > 0) {
        setTimeout(() => {
            showNotification(`Time to start ${subject.name}!`);
        }, startDelay);
    }

    // Calculate delay for end time notification
    const endDelay = endTime.getTime() - now.getTime();
    if (endDelay > 0) {
        setTimeout(() => {
            showNotification(`Time's up for ${subject.name}!`);
        }, endDelay);
    }
}

// Function to show notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    notification.style.backgroundColor = '#ff9800';
    notification.style.color = 'white';
    notification.style.padding = '10px';
    notification.style.marginTop = '10px';
    notification.style.borderRadius = '4px';

    setTimeout(() => {
        notification.style.display = 'none'; // Hide notification after 5 seconds
    }, 5000);
}

// Function to toggle subject completion
function toggleComplete(index) {
    subjects[index].completed = !subjects[index].completed;
    localStorage.setItem('subjects', JSON.stringify(subjects));
    displaySubjects(); // Refresh the subject list
}

// Function to delete a subject
function deleteSubject(index) {
    subjects.splice(index, 1); // Remove subject from array
    localStorage.setItem('subjects', JSON.stringify(subjects));
    displaySubjects(); // Refresh the subject list
}

// Event listener for the form submission
document.getElementById('subjectForm').addEventListener('submit', addSubject);

// Display subjects when the page loads
document.addEventListener('DOMContentLoaded', displaySubjects);
