"use strict";
class ProductCatalog {
    products;
    constructor(initialProducts = []) {
        this.products = initialProducts.map(product => ({ ...product }));
    }
    static isValidPrice(price) {
        return Number.isFinite(price) && price >= 0;
    }
    getAll() {
        return this.products.map(product => ({ ...product }));
    }
    getById(id) {
        const found = this.products.find(product => product.id === id);
        return found ? { ...found } : undefined;
    }
    add(product) {
        const exists = this.products.some(item => item.id === product.id);
        if (exists || !ProductCatalog.isValidPrice(product.price)) {
            return false;
        }
        this.products.push({ ...product });
        return true;
    }
    updatePrice(id, price) {
        if (!ProductCatalog.isValidPrice(price)) {
            return false;
        }
        const found = this.products.find(product => product.id === id);
        if (!found) {
            return false;
        }
        found.price = price;
        return true;
    }
    remove(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            return false;
        }
        this.products.splice(index, 1);
        return true;
    }
}
const initialProducts = [
    { id: 1, name: "Mouse", price: 1200, stock: 10, category: "Peripherals" },
    { id: 2, name: "Keyboard", price: 4500, stock: 5 }
];
const catalog = new ProductCatalog(initialProducts);
console.log("Добавление нового:", catalog.add({ id: 3, name: "Monitor", price: 15000, stock: 3 }));
console.log("Дубликат id:", catalog.add({ id: 1, name: "Other Mouse", price: 900, stock: 2 }));
console.log("Поиск id=2:", catalog.getById(2));
console.log("Поиск id=99:", catalog.getById(99));
console.log("Новая цена id=1:", catalog.updatePrice(1, 1000));
console.log("Отрицательная цена:", catalog.updatePrice(1, -500));
console.log("Цена NaN:", catalog.updatePrice(1, NaN));
console.log("Цена для id=99:", catalog.updatePrice(99, 2000));
console.log("Удаление id=2:", catalog.remove(2));
console.log("Текущий каталог:", catalog.getAll());
