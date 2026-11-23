interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    quantity: number;
    featured: boolean;
}

let products: Product[] = [];
let nextId = 1;

const form = document.querySelector<HTMLFormElement>("#product-form");
const nameInput = document.querySelector<HTMLInputElement>("#name");
const categorySelect = document.querySelector<HTMLSelectElement>("#category");
const priceInput = document.querySelector<HTMLInputElement>("#price");
const quantityInput = document.querySelector<HTMLInputElement>("#quantity");
const featuredInput = document.querySelector<HTMLInputElement>("#featured");
const errorEl = document.querySelector<HTMLParagraphElement>("#error-message");
const totalEl = document.querySelector<HTMLParagraphElement>("#total-cost");
const listEl = document.querySelector<HTMLUListElement>("#product-list");

function render(list: HTMLUListElement, total: HTMLParagraphElement): void {
    list.textContent = "";
    let totalCost = 0;

    for (const product of products) {
        totalCost += product.price * product.quantity;

        const item = document.createElement("li");
        const featuredText = product.featured ? " [Рекомендуемый]" : "";

        item.textContent = `${product.name} (${product.category}) — ${product.price} руб. * ${product.quantity} шт.${featuredText} `;

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Удалить";

        deleteButton.addEventListener("click", () => {
            products = products.filter(p => p.id !== product.id);
            render(list, total);
        });

        item.append(deleteButton);
        list.append(item);
    }

    total.textContent = `Общая стоимость: ${totalCost} руб.`;
}

if (
    form !== null &&
    nameInput !== null &&
    categorySelect !== null &&
    priceInput !== null &&
    quantityInput !== null &&
    featuredInput !== null &&
    errorEl !== null &&
    totalEl !== null &&
    listEl !== null
) {
    form.addEventListener("submit", event => {
        event.preventDefault();
        errorEl.textContent = "";

        const name = nameInput.value.trim();
        const category = categorySelect.value;
        const price = priceInput.valueAsNumber;
        const quantity = quantityInput.valueAsNumber;
        const featured = featuredInput.checked;

        if (name.length === 0) {
            errorEl.textContent = "Введите название товара.";
            return;
        }

        if (!Number.isFinite(price) || price <= 0) {
            errorEl.textContent = "Цена должна быть положительным числом.";
            return;
        }

        if (!Number.isInteger(quantity) || quantity <= 0) {
            errorEl.textContent = "Количество должно быть положительным целым числом.";
            return;
        }

        const newProduct: Product = {
            id: nextId,
            name,
            category,
            price,
            quantity,
            featured
        };

        nextId += 1;
        products.push(newProduct);

        render(listEl, totalEl);
        form.reset();
    });
}