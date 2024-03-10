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
    title.value = 'To-do List';
    return title;
}

// Function to create add task button andd add on-click listener to each 'Add task' button
function addTaskButton() {
    const taskButton = document.createElement('button');
    taskButton.classList.add('task-button');
    taskButton.textContent = '+ Add task';
    taskButton.addEventListener('click', function() {
        const toDoList = taskButton.parentNode;
        addTask(toDoList, taskButton);
    })
    return taskButton;
}

// Function to create and add on-click listener to each 'Add list' button
function addListButton() {
    const toDoListButton = document.createElement('button');
    toDoListButton.classList.add('to-do-list-button');
    toDoListButton.textContent = '+ Add list';
    toDoListButton.addEventListener('click', function() {
        createToDoList();
    })
    return toDoListButton;
}

// The logic behind the add task button
function addTask(toDoListContainer, thisTaskButton) {
    const container = document.createElement('div');
    container.classList.add('task-container');

    const newTask = document.createElement('input');
    newTask.classList.add('task');
    const checkBox = document.createElement('input');
    checkBox.setAttribute("type", "checkbox");

    container.appendChild(checkBox);
    container.appendChild(newTask);
    toDoListContainer.insertBefore(container, thisTaskButton);
}

//
initialToDoPage();