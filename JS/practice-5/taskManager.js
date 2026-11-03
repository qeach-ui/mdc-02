import { Task } from './task.js';

export class TaskManager {
    #tasks = [];

    addTask(title) {
        const task = new Task(title);
        this.#tasks.push(task);
        return task;
    }

    removeTask(index) {
        if (index >= 0 && index < this.#tasks.length) {
            this.#tasks.splice(index, 1);
        }
    }

    getTasks() {
        return this.#tasks;
    }
}