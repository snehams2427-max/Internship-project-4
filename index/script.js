// Load tasks from LocalStorage
window.onload = function() {
    let savedData = JSON.parse(localStorage.getItem("tasks")) || {};

    for (let column in savedData) {
        let columnDiv = document.getElementById(column).querySelector(".task-list");
        savedData[column].forEach(taskText => {
            createTaskElement(taskText, columnDiv);
        });
    }
};

// Add task function
function addTask(columnId) {
    let column = document.getElementById(columnId);
    let input = column.querySelector(".taskInput");
    let taskText = input.value.trim();
    if (!taskText) return;

    let taskList = column.querySelector(".task-list");
    createTaskElement(taskText, taskList);

    input.value = "";

    saveTasks();
}

// Create task card with delete button
function createTaskElement(text, parentDiv) {
    let task = document.createElement("div");
    task.className = "task";

    // Task text
    let span = document.createElement("span");
    span.textContent = text;
    task.appendChild(span);

    // Delete button
    let delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.className = "deleteBtn";
    delBtn.onclick = function() {
        task.remove();
        saveTasks(); // update LocalStorage
    };
    task.appendChild(delBtn);

    parentDiv.appendChild(task);
}

// Save tasks in LocalStorage
function saveTasks() {
    let data = {};
    document.querySelectorAll(".column").forEach(col => {
        let colId = col.id;
        let tasks = [];
        col.querySelectorAll(".task").forEach(t => tasks.push(t.textContent));
        data[colId] = tasks;
    });
    localStorage.setItem("tasks", JSON.stringify(data));
}