const STORAGE_KEY = "catalog-products";

interface Product {
    id: number;
    name: string;
    price: number;
    available: boolean;
    category?: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object"
        && value !== null
        && !Array.isArray(value);
}

function isProduct(value: unknown): value is Product {
    if (!isRecord(value)) return false;

    return typeof value.id === "number"
        && Number.isInteger(value.id)
        && value.id > 0
        && typeof value.name === "string"
        && value.name.trim().length > 0
        && typeof value.price === "number"
        && Number.isFinite(value.price)
        && value.price >= 0
        && typeof value.available === "boolean"
        && (!("category" in value) || typeof value.category === "string");
}

function isProductArray(value: unknown): value is Product[] {
    if (!Array.isArray(value)) return false;

    const entries: unknown[] = value;
    return entries.every(isProduct);
}

function readJson(text: string): unknown {
    try {
        const parsed: unknown = JSON.parse(text);
        return parsed;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Не удалось прочитать JSON: ${error.message}`);
        }
        throw new Error("Неизвестная ошибка при разборе JSON");
    }
}

function loadProducts(): Product[] {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === null) return [];

        const parsed: unknown = JSON.parse(stored);
        if (isProductArray(parsed)) {
            return parsed;
        }
    } catch (error: unknown) {
        console.warn("Не удалось прочитать сохранённый каталог", error);
    }

    return [];
}

function saveProducts(products: Product[]): boolean {
    try {
        const json = JSON.stringify(products);
        localStorage.setItem(STORAGE_KEY, json);
        return true;
    } catch (error: unknown) {
        console.error("Не удалось сохранить каталог", error);
        return false;
    }
}

function renderProducts(products: Product[], listEl: HTMLUListElement): void {
    listEl.textContent = "";

    for (const product of products) {
        const li = document.createElement("li");
        const category = product.category ?? "Без категории";
        const statusText = product.available ? "в наличии" : "нет в наличии";

        li.textContent = `#${product.id} ${product.name} — ${product.price} руб. (${statusText}, ${category})`;
        listEl.appendChild(li);
    }
}

const inputEl = document.getElementById("json-input");
const buttonEl = document.getElementById("import-btn");
const statusEl = document.getElementById("status");
const listEl = document.getElementById("product-list");

if (
    inputEl instanceof HTMLTextAreaElement &&
    buttonEl instanceof HTMLButtonElement &&
    statusEl instanceof HTMLParagraphElement &&
    listEl instanceof HTMLUListElement
) {
    const savedProducts = loadProducts();
    renderProducts(savedProducts, listEl);

    buttonEl.addEventListener("click", () => {
        try {
            const parsed: unknown = readJson(inputEl.value);

            if (!isProductArray(parsed)) {
                statusEl.textContent = "Ошибка структуры: ожидается массив корректных товаров.";
                return;
            }

            renderProducts(parsed, listEl);

            const isSaved = saveProducts(parsed);
            if (isSaved) {
                statusEl.textContent = `Успешно импортировано и сохранено товаров: ${parsed.length}`;
            } else {
                statusEl.textContent = "Товары отображены, но не удалось сохранить их в localStorage.";
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                statusEl.textContent = error.message;
            } else {
                statusEl.textContent = "Произошла неизвестная ошибка.";
            }
        }
    });
}