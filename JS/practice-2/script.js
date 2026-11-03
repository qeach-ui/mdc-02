const taskList = document.querySelector("#task-list");
const taskForm = document.querySelector("#task-form");
const taskFilter = document.querySelector("#task-filter");
let currentFilter = "all";
const taskCount = document.querySelector("#task-count");

let tasks = [];

taskFilter.addEventListener("change", () => {
  currentFilter = taskFilter.value;
  renderTasks();
});

function isVisible(task) {
  if (currentFilter === "active") return !task.completed;
  if (currentFilter === "completed") return task.completed;
  return true;
}

function renderTasks() {
  taskList.replaceChildren();
  
  const visibleTasks = tasks.filter(isVisible);
  taskCount.textContent = `Всего задач: ${tasks.length}`;

  for (const task of visibleTasks) {
    const item = document.createElement("li");
    item.classList.add("task");
    item.dataset.id = task.id;

    if (task.completed) {
      item.classList.add("completed");
    }

    const title = document.createElement("span");
    title.classList.add("task_title");
    title.textContent = task.title;

    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.textContent = task.completed ? "Отмена" : "Отметить";
    toggleBtn.dataset.action = "toggle";

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "Удалить";
    deleteBtn.dataset.action = "delete";

    item.append(title, toggleBtn, deleteBtn);
    taskList.append(item);
  }
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(taskForm);
  const title = data.get("title").trim();

  if (!title) return taskForm.reset();

  addTask(title);

  taskForm.reset();
});

function addTask(title) {
  tasks.push({
    id: Date.now(),
    title,
    completed: false,
  });

  renderTasks();
}

taskList.addEventListener("click", (event) => {
  const btn = event.target.closest("button[data-action]");
  if (!btn) return;

  const item = btn.closest(".task");
  const id = Number(item.dataset.id);

  if (btn.dataset.action === "delete") {
    tasks = tasks.filter((task) => task.id !== id);
  }

  if (btn.dataset.action === "toggle") {
    const task = tasks.find((task) => task.id === id);
    if (task) task.completed = !task.completed;
  }

  renderTasks();
});
