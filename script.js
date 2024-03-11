let todos = [];

//Function to create the initial to-do page
function initialToDoPage () {
    createToDoList();
}

// Function to create to-do objects
function createToDo (title, description, dueDate, priority) {
    return {title, description, dueDate, priority};
}

// Function to create a new to-do list
function createToDoList () {
    const content = document.querySelector('#content');

    const toDoList = document.createElement('div');
    toDoList.classList.add('to-do-list');

    const title = toDoListTitle();
    const taskButton = addTaskButton();
    const toDoListButton = addListButton();

    toDoList.appendChild(title);
    toDoList.appendChild(taskButton);
    toDoList.appendChild(toDoListButton);
    content.appendChild(toDoList);
}

// Function to create to-do list title

function toDoListTitle() {
    const title = document.createElement('input');
    title.classList.add('to-do-list-title');
    title.value = 'Todo List';
    return title;
}

// Function to create add task button andd add on-click listener to each 'Add task' button
function addTaskButton() {
    const taskButton = document.createElement('button');
    taskButton.classList.add('task-button');
    taskButton.textContent = '+ Add task';
    taskButton.addEventListener('click', function() {
        const toDoList = taskButton.parentNode;
        taskButton.style.display = 'none';
        createTaskForm(toDoList, taskButton);
    })
    return taskButton;
}

// Function to create and add on-click listener to each 'Add list' button
function addListButton() {
    const toDoListButton = document.createElement('button');
    toDoListButton.classList.add('to-do-list-button');
    toDoListButton.textContent = '+ Add list';
    toDoListButton.addEventListener('click', function() {
        toDoListButton.remove();
        createToDoList();
    })
    return toDoListButton;
}

// The logic behind the add task button
function addTask(toDoListContainer, thisTaskButton, title, dueDate, priority, description) {
    const container = document.createElement('div');
    container.classList.add('task-container');

    const checkBox = document.createElement('input');
    checkBox.setAttribute("type", "checkbox");

    const newTitle = document.createElement('input');
    newTitle.classList.add('task-title');
    newTitle.value = title;

    const newDate = document.createElement('input');
    newDate.classList.add('task-date');
    newDate.value = dueDate;

    const newPriority = document.createElement('input');
    newPriority.classList.add('task-priority');
    newPriority.value = priority;

    const newDescription = document.createElement('input');
    newDescription.classList.add('task-description');
    newDescription.value = description;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-todo-button');
    deleteButton.innerHTML = '<img src="./imgs/exit-form.png" class="exit-img">';
    deleteButton.addEventListener('click', function() {
        container.remove();
    })

    container.appendChild(checkBox);
    container.appendChild(newTitle);
    container.appendChild(newDate);
    container.appendChild(newPriority);
    container.appendChild(newDescription);
    container.appendChild(deleteButton);
    thisTaskButton.style.display = 'block';
    toDoListContainer.insertBefore(container, thisTaskButton);

    const todo = createToDo(title, description, dueDate, priority);
    todos.push(todo);
}

// Function to create a form for task information
function createTaskForm(toDoListContainer, thisTaskButton) {
    const taskForm = document.createElement('form');
    taskForm.innerHTML = `
        <label for="title">Title:</label>
        <input type="text" id="title" name="title"><br>
        <label for="due-date">Due Date:</label>
        <input type="date" id="due-date" name="due-date"><br>
        <label for="priority">Priority:</label>
        <select id="priority" name="priority">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
        </select><br>
        <label for="description">Description:</label>
        <input type="text" id="description" name="description"><br>
        <button type="submit" id="form-button"><img src="./imgs/send.png" id="send-img"></button>
        <button id="exit-form-button"><img src="./imgs/exit-form.png" class="exit-img"></button>
    `;
    toDoListContainer.insertBefore(taskForm, thisTaskButton);

    const submitButton = document.querySelector('#form-button');
    const titleInput = document.querySelector('#title');
    const submitImg = document.querySelector('#send-img');
    submitButton.disabled = true;
    submitImg.style.opacity = 0.5;

    titleInput.addEventListener('input', function() {
        if (titleInput.value.trim() !== '') {
            submitButton.disabled = false;
            submitImg.style.opacity = 1.0;
        }
        else {
            submitButton.disabled = true;
            submitImg.style.opacity = 0.5;
        }
    });

    const exitButton = document.querySelector('#exit-form-button');
    exitButton.addEventListener('click', function() {
        taskForm.remove();
        thisTaskButton.style.display = 'block';
    });

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        taskFormSubmitButton(toDoListContainer, thisTaskButton, taskForm);
    });
}

// Logic behind task-form submit button
function taskFormSubmitButton(toDoListContainer, thisTaskButton, thisTaskForm) {
    const formData = new FormData(thisTaskForm);
    const title = formData.get("title");
    const dueDate = formData.get("due-date");
    const priority = formData.get("priority");
    const description = formData.get("description");
    addTask(toDoListContainer, thisTaskButton, title, dueDate, priority, description);
    thisTaskForm.remove();
}

//
initialToDoPage();