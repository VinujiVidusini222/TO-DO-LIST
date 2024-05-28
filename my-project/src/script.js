const apiUrl = 'http://localhost:3000/tasks';

async function fetchTasks() {
    const response = await fetch(apiUrl);
    const tasks = await response.json();
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            ${task.title}
            <div>
                <button onclick="toggleTask('${task._id}')">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="deleteTask('${task._id}')">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

async function addTask() {
    const taskInput = document.getElementById('new-task');
    const newTask = { title: taskInput.value, completed: false };

    await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
    });

    taskInput.value = '';
    fetchTasks();
}

async function toggleTask(id) {
    const response = await fetch(`${apiUrl}/${id}`);
    const task = await response.json();
    task.completed = !task.completed;

    await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });

    fetchTasks();
}

async function deleteTask(id) {
    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    });

    fetchTasks();
}

fetchTasks();
