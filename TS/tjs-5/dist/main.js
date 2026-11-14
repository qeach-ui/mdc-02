"use strict";
const sampleCatalogItem = {
    id: 10,
    title: "Keyboard",
    price: 3500,
    category: "Peripherals"
};
function assertNever(value) {
    throw new Error(`Необработанный вариант: ${value}`);
}
function getStateMessage(state) {
    switch (state.status) {
        case "idle":
            return "Ожидание запуска загрузки";
        case "loading":
            return `Загрузка началась в ${state.startedAt}`;
        case "success": {
            const count = state.products.length;
            let total = 0;
            for (const item of state.products) {
                total += item.price;
            }
            return `Загружено товаров: ${count}, общая стоимость: ${total}`;
        }
        case "empty":
            return `Запрос выполнен в ${state.loadedAt}, но каталог пуст`;
        case "error": {
            const retryText = state.retryable ? "можно повторить" : "повтор невозможен";
            return `Ошибка: ${state.message} (${retryText})`;
        }
        default:
            return assertNever(state);
    }
}
const productsList = [
    { id: 1, title: "Мышь", price: 1500 },
    { id: 2, title: "Монитор", price: 20000 }
];
const states = [
    { status: "idle" },
    { status: "loading", startedAt: 1000 },
    { status: "success", products: productsList, loadedAt: 1200 },
    { status: "empty", loadedAt: 1300 },
    { status: "error", message: "Сервер недоступен", retryable: true }
];
for (const state of states) {
    console.log(getStateMessage(state));
}
function formatValue(value) {
    if (typeof value === "string") {
        return value.trim().toUpperCase();
    }
    return value.toFixed(2);
}
console.log(formatValue("sku-125"));
console.log(formatValue(125.5));
function describeMaterial(item) {
    if ("pages" in item) {
        return `${item.title}: ${item.pages} страниц`;
    }
    return `${item.title}: ${item.durationMinutes} минут`;
}
console.log(describeMaterial({ title: "Основы TypeScript", pages: 250 }));
console.log(describeMaterial({ title: "Курс по TypeScript", durationMinutes: 180 }));
function formatSearch(input) {
    if (typeof input === "string") {
        return `Поиск по строке: ${input.trim()}`;
    }
    return `Поиск по параметрам: "${input.query}", цена до ${input.maxPrice}`;
}
console.log(formatSearch("  клавиатура "));
console.log(formatSearch({ query: "клавиатура", maxPrice: 5000 }));
function isProduct(value) {
    return (typeof value !== "string" &&
        typeof value.id === "number" &&
        typeof value.title === "string" &&
        typeof value.price === "number");
}
function getProductTitle(value) {
    if (isProduct(value)) {
        return `${value.title} (${value.price} руб.)`;
    }
    return value.toUpperCase();
}
console.log(getProductTitle({ id: 1, title: "Наушники", price: 4000 }));
console.log(getProductTitle("товар по акции"));
