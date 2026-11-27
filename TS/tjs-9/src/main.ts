interface ApiTask {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

type LoadState<T> =
    | { status: "idle" }
    | { status: "loading" }
    | { status: "success"; data: T }
    | { status: "error"; message: string };

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object"
        && value !== null
        && !Array.isArray(value);
}

function isApiTask(value: unknown): value is ApiTask {
    if (!isRecord(value)) {
        return false;
    }

    return Number.isInteger(value.userId)
        && Number.isInteger(value.id)
        && typeof value.title === "string"
        && typeof value.completed === "boolean";
}

function parseApiTasks(value: unknown): ApiTask[] {
    if (!Array.isArray(value)) {
        throw new Error("Ожидался массив задач");
    }

    const items: unknown[] = value;
    const result: ApiTask[] = [];

    for (const item of items) {
        if (!isApiTask(item)) {
            throw new Error("Получена задача неверного формата");
        }

        result.push(item);
    }

    return result;
}

function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }

    return "Произошла неизвестная ошибка";
}

async function loadTasks(): Promise<ApiTask[]> {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    const raw: unknown = await response.json();
    return parseApiTasks(raw);
}

function render(
    state: LoadState<ApiTask[]>,
    statusEl: HTMLParagraphElement,
    listEl: HTMLUListElement,
    buttonEl: HTMLButtonElement
): void {
    listEl.textContent = "";

    switch (state.status) {
        case "idle":
            buttonEl.disabled = false;
            statusEl.textContent = "Нажмите кнопку, чтобы загрузить задачи.";
            break;

        case "loading":
            buttonEl.disabled = true;
            statusEl.textContent = "Загрузка...";
            break;

        case "success":
            buttonEl.disabled = false;
            if (state.data.length === 0) {
                statusEl.textContent = "Список задач пуст.";
                return;
            }

            statusEl.textContent = `Загружено задач: ${state.data.length}`;
            for (const task of state.data) {
                const li = document.createElement("li");
                const mark = task.completed ? "[x]" : "[ ]";
                li.textContent = `${mark} #${task.id} ${task.title}`;
                listEl.append(li);
            }
            break;

        case "error":
            buttonEl.disabled = false;
            statusEl.textContent = `Ошибка: ${state.message}`;
            break;
    }
}

const loadBtn = document.querySelector<HTMLButtonElement>("#load-btn");
const statusEl = document.querySelector<HTMLParagraphElement>("#status");
const listEl = document.querySelector<HTMLUListElement>("#task-list");

let state: LoadState<ApiTask[]> = { status: "idle" };

if (loadBtn !== null && statusEl !== null && listEl !== null) {
    render(state, statusEl, listEl, loadBtn);

    loadBtn.addEventListener("click", async () => {
        state = { status: "loading" };
        render(state, statusEl, listEl, loadBtn);

        try {
            const tasks = await loadTasks();
            state = { status: "success", data: tasks };
        } catch (error: unknown) {
            state = { status: "error", message: getErrorMessage(error) };
        }

        render(state, statusEl, listEl, loadBtn);
    });
}