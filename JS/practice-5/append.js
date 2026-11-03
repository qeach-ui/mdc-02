import { TaskManager } from './taskManager.js';

const manager = new TaskManager();

const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    try {
        manager.addTask(input.value);
        input.value = '';
        render();
    } catch (error) {
        alert(error.message);
    }
});

function render() {
    list.innerHTML = '';
    manager.getTasks().forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.getTitle();
        
        if (task.completed) {
            li.style.textDecoration = 'line-through';
        }

        const completeBtn = document.createElement('button');
        completeBtn.textContent = task.completed ? 'Вернуть' : 'Выполнить';
        completeBtn.onclick = () => {
            task.complete();
            render();
        };

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Удалить';
        deleteBtn.onclick = () => {
            manager.removeTask(index);
            render();
        };

        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}