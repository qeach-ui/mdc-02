interface OrderItem {
    id: number;
    title: string;
    unitPrice: number;
    quantity: number;
}

interface Order {
    id: number;
    customer: string;
    items: OrderItem[];
    discountPercent?: number;
}

type PriceFormatter = (value: number) => string;

const orders: Order[] = [
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

function calculateItemTotal(item: OrderItem): number {
    return item.unitPrice * item.quantity;
}

function calculateSubtotal(items: OrderItem[]): number {
    return items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
}

function applyDiscount(subtotal: number, percent: number = 0): number {
    if (percent < 0 || percent > 100) {
        throw new Error("Скидка должна быть от 0 до 100 процентов");
    }
    return subtotal - (subtotal * percent / 100);
}

function formatPrice(value: number, currency: string = "RUB"): string {
    return `${value.toFixed(2)} ${currency}`;
}

function formatOrder(order: Order, formatter: PriceFormatter = formatPrice): string {
    const subtotal = calculateSubtotal(order.items);
    const finalPrice = order.discountPercent !== undefined 
        ? applyDiscount(subtotal, order.discountPercent) 
        : subtotal;
    
    return `Заказ #${order.id} (${order.customer}): Итого ${formatter(finalPrice)}`;
}

function selectItems(items: OrderItem[], predicate: (item: OrderItem) => boolean): OrderItem[] {
    return items.filter(predicate);
}

const expensiveItemsFilter = (item: OrderItem) => item.unitPrice > 1000;
const multipleQuantityFilter = (item: OrderItem) => item.quantity > 1;


const allItems = orders.flatMap(order => order.items);
const itemTitles: string[] = allItems.map(item => item.title);

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


type OrderPredicate = (order: Order) => boolean;
function selectOrders(orders: Order[], predicate: OrderPredicate): Order[] {
    return orders.filter(predicate);
}
const discountedOrdersFilter: OrderPredicate = order => order.discountPercent !== undefined;
console.log("Заказы со скидкой:", selectOrders(orders, discountedOrdersFilter));

function sumValues(...values: number[]): number {
    return values.reduce((total, value) => total + value, 0);
}

console.log("Сумма чисел (пусто):", sumValues());
console.log("Сумма чисел (одно):", sumValues(10)); 
console.log("Сумма чисел (несколько):", sumValues(10, 20, 30)); 

function transformItems(items: OrderItem[], transformCallback: (item: OrderItem) => OrderItem): OrderItem[] {
    return items.map(transformCallback);
}
const increasePriceCallback = (item: OrderItem) => ({ ...item, unitPrice: item.unitPrice + 100 });
console.log("Позиции с увеличенной ценой:", transformItems(allItems, increasePriceCallback));

function getOrderDisplay(orderId: number): string;
function getOrderDisplay(orderCode: string): string;
function getOrderDisplay(identifier: number | string): string {
    return `Заказ [${identifier}]`;
}
console.log(getOrderDisplay(101));
console.log(getOrderDisplay("ORD-999"));

interface DeliveryOptions {
    address: string;
    express: boolean;
    contactPhone?: string;
}
function setupDelivery(options: DeliveryOptions): void {
    console.log(`Доставка по адресу: ${options.address}, Экспресс: ${options.express}`);
}
setupDelivery({ address: "ул. Пушкина, 10", express: true });