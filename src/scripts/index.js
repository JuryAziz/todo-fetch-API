
let tasks = [];
let lastID = 0;
const tasksBodyContainer = document.querySelector('.tasks-container');
const headerContainer = document.querySelector('header');
const loadMoreButton = document.querySelector('.load-btn');

const fetchData = async () => {
    tasks = await fetch('https://jsonplaceholder.typicode.com/todos')
        .then((res) => res.json()).catch((ex) => console.log(ex));
}

const main = async () => {
    await fetchData();
    renderTasks();    
    loadMoreButton.addEventListener('click', () => renderTasks(tasks));
}

renderTasks = () => {

    for (i = lastID; i < lastID + 21 && i < tasks.length; i++) {

        const task = tasks[i];
        const taskContainer = document.createElement('div');
        const checkbox = document.createElement('input');
        const title = document.createElement('p');

        taskContainer.className = 'task';
        task.completed ? title.className = ('task-title', 'done-task') : 'task-title';
        checkbox.className = 'checkbox';
        checkbox.type = 'checkbox';

        title.textContent = task.title;
        checkbox.checked = task.completed;

        taskContainer.appendChild(checkbox);
        taskContainer.appendChild(title);

        tasksBodyContainer.appendChild(taskContainer);
    }
    
    lastID += 21;
    if(lastID >= tasks.length){
        loadMoreButton.style.display = 'none';
    }
}

const clock = () => {
    const date = new Date().toLocaleTimeString();
    document.querySelector('.time').textContent = date;
}

setInterval(clock, 1000);
main();