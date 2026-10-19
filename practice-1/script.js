const products = [
    { id: 1, name: 'Laptop', price: 80000, quantity: 2, category: 'electronics' },
    { id: 2, name: 'Mouse', price: 2500, quantity: 5, category: 'electronics' },
    { id: 3, name: 'Keyboard', price: 4500, quantity: 3, category: 'electronics' },
    { id: 4, name: 'Chair', price: 18000, quantity: 1, category: 'furniture' },
    { id: 5, name: 'Desk', price: 25000, quantity: 2, category: 'furniture' }
];

function getProductTotal(product){
    return product.price * product.quantity;
}

function getTotalInventoryValue(products){
    return products.reduce((total, product) => {
        return total + (product.price * product.quantity);
    }, 0);
}

function getMostExpensiveProduct(products){
    return products.reduce((firstProduct, secondProduct)=> firstProduct.price>secondProduct.price ? firstProduct : secondProduct)
}

function filterByCategory(products, category){
    return products.filter(product => product.category===category)
}

function findProduct(products, id){
    return products.find(product => product.id === id)
}

function getAvailableProducts(products){
    return products.filter(product => product.quantity>0)
}

function getCategoryStatistics(products) {
    return products.reduce((stats, product) => {
        const cat = product.category;
        if (!stats[cat]) {
            stats[cat] = 0;
        }
        stats[cat] += product.quantity;
        return stats;
    }, {});
}


function updateProductQuantity(products, id, quantity) {
    return products.map(product => {
        if (product.id === id) {
            return { ...product, quantity: quantity };
        }
        return product;
    });
}

function sortProductsByPrice(products) {
    return [...products].sort((a, b) => a.price - b.price);
}


// 1. Стоимость конкретного товара (на примере первого товара)
console.log(getProductTotal(products[0]));

// 2. Общая стоимость каталога
console.log(getTotalInventoryValue(products));

// 3. Товар с максимальной ценой за единицу
console.log(getMostExpensiveProduct(products));

// 4. Массив товаров выбранной категории
console.log(filterByCategory(products, 'furniture'));

// 5. Поиск товара по id
console.log(findProduct(products, 3));

// 6. Получение доступных товаров в наличии
console.log(getAvailableProducts(products));

// 7. Объект со статистикой по категориям
console.log(getCategoryStatistics(products));

// 8. Новый массив с измененным количеством товара (Mouse, id: 2)
console.log(updateProductQuantity(products, 2, 10));

// 9. Сортировка каталога по цене с использованием копии
console.log(sortProductsByPrice(products));
