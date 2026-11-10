"use strict";
const orders = [
    {
        id: 101,
        customer: "Алиса",
        items: [
            { id: 1, title: "Книга", unitPrice: 500, quantity: 2 },
            { id: 2, title: "Ручка", unitPrice: 50, quantity: 5 }
        ]
    },
    {
        id: 102,
        customer: "Боб",
        discountPercent: 10,
        items: [
            { id: 3, title: "Ноутбук", unitPrice: 60000, quantity: 1 },
            { id: 4, title: "Мышь", unitPrice: 1500, quantity: 1 }
        ]
    },
    {
        id: 103,
        customer: "Чарли",
        discountPercent: 20,
        items: [
            { id: 5, title: "Монитор", unitPrice: 15000, quantity: 2 },
            { id: 6, title: "Кабель", unitPrice: 800, quantity: 3 }
        ]
    }
];
function calculateItemTotal(item) {
    return item.unitPrice * item.quantity;
}
function calculateSubtotal(items) {
    return items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
}
function applyDiscount(subtotal, percent = 0) {
    if (percent < 0 || percent > 100) {
        throw new Error("Скидка должна быть от 0 до 100 процентов");
    }
    return subtotal - (subtotal * percent / 100);
}
function formatPrice(value, currency = "RUB") {
    return `${value.toFixed(2)} ${currency}`;
}
function formatOrder(order, formatter = formatPrice) {
    const subtotal = calculateSubtotal(order.items);
    const finalPrice = order.discountPercent !== undefined
        ? applyDiscount(subtotal, order.discountPercent)
        : subtotal;
    return `Заказ #${order.id} (${order.customer}): Итого ${formatter(finalPrice)}`;
}
function selectItems(items, predicate) {
    return items.filter(predicate);
}
const expensiveItemsFilter = (item) => item.unitPrice > 1000;
const multipleQuantityFilter = (item) => item.quantity > 1;
const allItems = orders.flatMap(order => order.items);
const itemTitles = allItems.map(item => item.title);
const targetItem = allItems.find(item => item.id === 5);
if (targetItem !== undefined) {
    console.log("Найденная позиция:", targetItem.title);
}
orders.forEach(order => {
    console.log(formatOrder(order));
});
console.log("Дорогие позиции:", selectItems(allItems, expensiveItemsFilter));
console.log("Позиции (больше одной штуки):", selectItems(allItems, multipleQuantityFilter));
console.log("Названия всех позиций:", itemTitles);
function selectOrders(orders, predicate) {
    return orders.filter(predicate);
}
const discountedOrdersFilter = order => order.discountPercent !== undefined;
console.log("Заказы со скидкой:", selectOrders(orders, discountedOrdersFilter));
function sumValues(...values) {
    return values.reduce((total, value) => total + value, 0);
}
console.log("Сумма чисел (пусто):", sumValues());
console.log("Сумма чисел (одно):", sumValues(10));
console.log("Сумма чисел (несколько):", sumValues(10, 20, 30));
function transformItems(items, transformCallback) {
    return items.map(transformCallback);
}
const increasePriceCallback = (item) => ({ ...item, unitPrice: item.unitPrice + 100 });
console.log("Позиции с увеличенной ценой:", transformItems(allItems, increasePriceCallback));
function getOrderDisplay(identifier) {
    return `Заказ [${identifier}]`;
}
console.log(getOrderDisplay(101));
console.log(getOrderDisplay("ORD-999"));
function setupDelivery(options) {
    console.log(`Доставка по адресу: ${options.address}, Экспресс: ${options.express}`);
}
setupDelivery({ address: "ул. Пушкина, 10", express: true });
