"use strict";
const STORAGE_KEY = "catalog-products";
function isRecord(value) {
    return typeof value === "object"
        && value !== null
        && !Array.isArray(value);
}
function isProduct(value) {
    if (!isRecord(value))
        return false;
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
function isProductArray(value) {
    if (!Array.isArray(value))
        return false;
    const entries = value;
    return entries.every(isProduct);
}
function readJson(text) {
    try {
        const parsed = JSON.parse(text);
        return parsed;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Не удалось прочитать JSON: ${error.message}`);
        }
        throw new Error("Неизвестная ошибка при разборе JSON");
    }
}
function loadProducts() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === null)
            return [];
        const parsed = JSON.parse(stored);
        if (isProductArray(parsed)) {
            return parsed;
        }
    }
    catch (error) {
        console.warn("Не удалось прочитать сохранённый каталог", error);
    }
    return [];
}
function saveProducts(products) {
    try {
        const json = JSON.stringify(products);
        localStorage.setItem(STORAGE_KEY, json);
        return true;
    }
    catch (error) {
        console.error("Не удалось сохранить каталог", error);
        return false;
    }
}
function renderProducts(products, listEl) {
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
if (inputEl instanceof HTMLTextAreaElement &&
    buttonEl instanceof HTMLButtonElement &&
    statusEl instanceof HTMLParagraphElement &&
    listEl instanceof HTMLUListElement) {
    const savedProducts = loadProducts();
    renderProducts(savedProducts, listEl);
    buttonEl.addEventListener("click", () => {
        try {
            const parsed = readJson(inputEl.value);
            if (!isProductArray(parsed)) {
                statusEl.textContent = "Ошибка структуры: ожидается массив корректных товаров.";
                return;
            }
            renderProducts(parsed, listEl);
            const isSaved = saveProducts(parsed);
            if (isSaved) {
                statusEl.textContent = `Успешно импортировано и сохранено товаров: ${parsed.length}`;
            }
            else {
                statusEl.textContent = "Товары отображены, но не удалось сохранить их в localStorage.";
            }
        }
        catch (error) {
            if (error instanceof Error) {
                statusEl.textContent = error.message;
            }
            else {
                statusEl.textContent = "Произошла неизвестная ошибка.";
            }
        }
    });
}
