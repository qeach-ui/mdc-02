"use strict";
const productNames = ["Мышь", "Клавиатура", "Монитор", "Кабель", "Наушники", "Коврик"];
const prices = [1200.50, 3500, 15000.99, 500, 4200, 800];
const availability = [true, true, false, true, false, true];
const productRows = [
    ["Мышь", 1200.50, true],
    ["Клавиатура", 3500, true],
    ["Монитор", 15000.99, false],
    ["Кабель", 500, true],
    ["Наушники", 4200, false],
    ["Коврик", 800, true]
];
const availableProducts = productRows.filter(row => row[2] === true);
const productLabels = productRows.map(row => `${row[0]}: ${row[1]} руб.`);
const totalAvailableCost = availableProducts.reduce((sum, row) => sum + row[1], 0);
function printStatistics(total) {
    console.log(`Общая стоимость доступных товаров: ${total} руб.`);
}
printStatistics(totalAvailableCost);
function throwError(message) {
    throw new Error(message);
}
const priceText = "2500";
const parsedPrice = Number(priceText);
if (Number.isFinite(parsedPrice) && parsedPrice >= 0) {
    console.log(`Цена корректна: ${parsedPrice}`);
}
else {
    console.log("Ошибка: цена некорректна или меньше нуля");
}
