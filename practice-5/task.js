export class Task {
    #title;
    completed = false;

    constructor(title) {
        this.setTitle(title);
    }

    getTitle() {
        return this.#title;
    }

    setTitle(newTitle) {
        if (!newTitle || newTitle.trim() === "") {
            throw new Error("Название задачи не может быть пустым");
        }
        this.#title = newTitle.trim();
    }

    complete() {
        this.completed = !this.completed;
    }
}