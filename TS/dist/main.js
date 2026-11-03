"use strict";
const productName = "Wireless mouse";
let unitPrice = 2500;
let quantity = 3;
let isAvailable = true;
const discountPercent = 10;
const output = document.querySelector("#result");
if (unitPrice <= 0 || quantity < 1) {
    const errorMsg = "Ошибка: цена должна быть больше нуля, а количество — не менее 1.";
    if (output !== null) {
        output.textContent = errorMsg;
    }
    console.error(errorMsg);
}
else if (!isAvailable) {
    const unavailableMsg = `${productName} в данный момент недоступна для заказа.`;
    if (output !== null) {
        output.textContent = unavailableMsg;
    }
    console.log(unavailableMsg);
}
else {
    const baseTotal = unitPrice * quantity;
    const total = baseTotal - (baseTotal * discountPercent) / 100;
    const resultMessage = `Товар: ${productName} | Количество ${quantity} шт. | Итог со скидкой: ${total} руб.`;
    if (output !== null) {
        output.textContent = resultMessage;
    }
    console.log(resultMessage);
}
