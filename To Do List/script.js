
document.getElementById("add-task-btn").addEventListener("click", addTask);

// Additional code for keypress event
document.getElementById("task-input").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});
function addTask() {
    var taskInput = document.getElementById("task-input");
    if (taskInput.value === "") {
        alert("Please enter a task");
        return;    }

    var taskList = document.getElementById("todo-list");
    var newTask = document.createElement("li");
    newTask.classList.add('task-container'); // This will add a class to each task

    // Add Check button
    var checkButton = document.createElement("button");
    checkButton.classList.add("check-btn");
    checkButton.innerHTML = "&#10003;";
    checkButton.addEventListener("click", function() {
        taskText.classList.toggle("task-done");  // This will toggle a class on the task text
        checkButton.classList.toggle("clicked");  // This will toggle a class on the button
    });
    newTask.appendChild(checkButton);

    // Add task text within a span
    var taskText = document.createElement("span");
    taskText.textContent = taskInput.value;
    newTask.appendChild(taskText);

    // Add Delete button
    var deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", function() {
        taskList.removeChild(newTask);  // This will remove the task
    });
    newTask.appendChild(deleteButton);

    taskList.appendChild(newTask);

    taskInput.value = "";
}
