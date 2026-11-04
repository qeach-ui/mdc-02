const productNames: string[] = ["Мышь", "Клавиатура", "Монитор", "Кабель", "Наушники"];
const prices: number[] = [1200.50, 3500, 15000.99, 500, 4200];
const availability: boolean[] = [true, true, false, true, false];


const productRows: [string, number, boolean][] = [
    ["Мышь", 1200.50, true],
    ["Клавиатура", 3500, true],
    ["Монитор", 15000.99, false],
    ["Кабель", 500, true],
    ["Наушники", 4200, false]
];

const availableProducts = productRows.filter(row => row[2] === true);

const productLabels = productRows.map(row => `${row[0]}: ${row[1]} руб.`);

const totalAvailableCost = availableProducts.reduce((sum, row) => sum + row[1], 0);

function printStatistics(total: number): void {
    console.log(`Общая стоимость доступных товаров: ${total} руб.`);
}
printStatistics(totalAvailableCost);

const priceText: string = "2500";
const parsedPrice: number = Number(priceText);

if (Number.isFinite(parsedPrice) && parsedPrice >= 0) {
    console.log(`Цена корректна: ${parsedPrice}`);
} else {
    console.log("Ошибка: цена некорректна или меньше нуля");
}

function throwError(message: string): never {
    throw new Error(message);
}