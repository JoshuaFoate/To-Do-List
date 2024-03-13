let todos = [];

//Function to create the initial to-do page
function initialToDoPage () {
    createToDoList();
}

// Function to create to-do objects
function createToDo (title, dueDate, priority, description) {
    return {title, dueDate, priority, description};
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
    const toDoContainer = document.createElement('div');
    toDoContainer.classList.add('todo-container');

    const container = document.createElement('button');
    container.classList.add('task-container');
    container.addEventListener('click', function() {
        if (container.contains(newDescription)) {
            newDescription.remove();
        }
        else {
            container.appendChild(newDescription);
        }
    });

    const checkBox = document.createElement('button');
    checkBox.classList.add('checkbox');
    checkBox.addEventListener('click', function() {
        toDoContainer.remove();
    });
    checkBox.addEventListener('mouseover', function() {
        checkBox.style.color = 'black';
        checkBox.style.backgroundColor = 'rgb(145, 144, 144)';
    });
    checkBox.addEventListener('mouseout', function() {
        checkBoxColor(checkBox, priority);
    });

    const newTitle = document.createElement('p');
    newTitle.classList.add('task-title');
    newTitle.textContent = title;

    const newDate = document.createElement('p');
    newDate.classList.add('task-date');
    newDate.textContent = dueDate;

    const newPriority = document.createElement('p');
    newPriority.classList.add('task-priority');

    const newDescription = document.createElement('p');
    newDescription.classList.add('task-description');
    newDescription.textContent = description;

    container.appendChild(newTitle);
    if (dueDate) {
        container.appendChild(newDate);
    }
    toDoContainer.appendChild(checkBox);
    toDoContainer.appendChild(container);
    toDoListContainer.insertBefore(toDoContainer, thisTaskButton);

    checkBoxColor(checkBox, priority);

    thisTaskButton.style.display = 'block';

    const todo = createToDo(title, dueDate, priority, description);
    todos.push(todo);

    console.log(localStorage);
}

// Function to create a form for task information
function createTaskForm(toDoListContainer, thisTaskButton) {
    const taskForm = document.createElement('form');
    taskForm.innerHTML = `
        <label for="title"></label>
        <input type="text" id="title" name="title" placeholder="Title"><br>
        <label for="description"></label>
        <input type="text" id="description" name="description" placeholder="Description"><br>
        <label for="due-date"></label>
        <input type="date" id="due-date" name="due-date"><br>
        <label for="priority"></label>
        <select id="priority" name="priority">
            <option style="display: none;" value="" selected>Priority...</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
        </select><br>
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
            submitImg.addEventListener('mouseover', () => {
                submitImg.style.backgroundColor = 'lightgrey';
            });
            submitImg.addEventListener('mouseout', () => {
                submitImg.style.backgroundColor = '';
            });
            submitImg.style.opacity = 1.0;
        }
        else {
            submitImg.addEventListener('mouseover', () => {
                submitImg.style.backgroundColor = '';
            });
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

// Function for checkBox logic; color and mouseover.
function checkBoxColor(checkBox, priority) {
    if (priority == 'High') {
        checkBox.style.color = 'red';
        checkBox.style.backgroundColor = 'rgb(255, 205, 204)';
    }
    else if (priority == 'Medium') {
        checkBox.style.color = 'blue';
        checkBox.style.backgroundColor = 'rgb(190, 209, 250)';
    }
    else if (priority == 'Low') {
        checkBox.style.color = 'green';
        checkBox.style.backgroundColor = 'rgb(202, 252, 214)';
    }
    else {
        checkBox.style.color = 'black';
        checkBox.style.backgroundColor = 'white';
    }
}

initialToDoPage();