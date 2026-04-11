// Task 4: Add & Display Tasks
function addTask() {
    var input = document.getElementById("taskInput");
    var taskText = input.value;

    // Prevent empty tasks
    if (taskText === "") {
        alert("Please write something!");
        return;
    }

    // Get the <ul> element
    var list = document.getElementById("taskList");

    // Create a new <li> element
    var li = document.createElement("li");

    // Task 6: Add a checkbox for completion
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onclick = function() {
        if (checkbox.checked) {
            li.classList.add("completed");
        } else {
            li.classList.remove("completed");
        }
    };

    // Create a <span> to hold the task text
    var span = document.createElement("span");
    span.innerHTML = taskText;

    // Task 5: Create Edit Button
    var editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editBtn.className = "edit-btn";
    editBtn.onclick = function() {
        var newText = prompt("Edit your task:", span.innerHTML);
        if (newText !== null && newText !== "") {
            span.innerHTML = newText;
        }
    };

    // Task 5: Create Delete Button
    var deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = function() {
        list.removeChild(li); // Removes the task from the list
    };

    // Put everything inside the <li>
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    // Add the <li> to the <ul>
    list.appendChild(li);

    // Clear the input box for the next task
    input.value = "";
}
