import { Task } from './task.js';

export class TaskManager {
    #tasks = [];
    #storageKey;

    constructor(storageKey = 'tasks_js06_classes') {
        this.#storageKey = storageKey;
        this.#loadTasks();
    }

    get tasks() {
        return this.#tasks;
    }

    addTask(title, url) {
        const task = new Task(title, url);
        this.#tasks.push(task);
        this.#saveTasks();
        return task;
    }

    removeTask(index) {
        this.#tasks.splice(index, 1);
        this.#saveTasks();
    }

    #loadTasks() {
        try {
            const raw = localStorage.getItem(this.#storageKey);
            if (!raw) return;
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
                this.#tasks = parsed
                    .filter(item => item && item.title)
                    .map(item => new Task(item.title, item.url));
            }
        } catch (e) {
            console.error('Ошибка чтения localStorage', e);
        }
    }

    #saveTasks() {
        const dataToSave = this.#tasks.map(t => ({ title: t.title, url: t.url }));
        localStorage.setItem(this.#storageKey, JSON.stringify(dataToSave));
    }
}