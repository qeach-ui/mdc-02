interface SupplierContact {
    email?: string;
    phone?: string;
}

interface Supplier {
    name: string;
    country: string;
    contact?: SupplierContact;
}

interface Product {
    readonly id: number;
    name: string;
    category: string;
    price: number;
    isAvailable: boolean;
    tags: string[];
    supplier: Supplier;
    description?: string;
}

const products: Product[] = [
    { id: 1, name: "Мышь", category: "Периферия", price: 1500, isAvailable: true, tags: ["wireless"], supplier: { name: "TechInc", country: "Китай", contact: { email: "a@tech.com" } } },
    { id: 2, name: "Клавиатура", category: "Периферия", price: 3000, isAvailable: true, tags: ["mechanical"], supplier: { name: "KeyCorp", country: "Тайвань" } }, // Отсутствуют контакты
    { id: 3, name: "Монитор", category: "Дисплеи", price: 15000, isAvailable: false, tags: ["4k"], supplier: { name: "ViewTech", country: "Польша", contact: {} }, description: "27 дюймов" },
    { id: 4, name: "Кабель", category: "Аксессуары", price: 500, isAvailable: true, tags: ["usb"], supplier: { name: "WireCo", country: "Китай", contact: { phone: "12345" } } },
    { id: 5, name: "Ноутбук", category: "Компьютеры", price: 80000, isAvailable: true, tags: ["gaming"], supplier: { name: "PCMaker", country: "США", contact: { email: "sales@pc.com" } }, description: "Игровой" },
    { id: 6, name: "Коврик", category: "Аксессуары", price: 800, isAvailable: false, tags: ["cloth"], supplier: { name: "TechInc", country: "Китай" } }
];

const availableProducts = products.filter(p => p.isAvailable);
console.log("Доступные товары:", availableProducts);

const productNames = products.map(p => p.name);
console.log("Названия товаров:", productNames);

const targetProduct = products.find(p => p.id === 5);

if (targetProduct !== undefined) {
    // Проверка необязательного описания
    if (targetProduct.description !== undefined) {
        console.log("Описание:", targetProduct.description);
    }
    
    if (targetProduct.supplier.contact !== undefined) {
        if (targetProduct.supplier.contact.email !== undefined) {
            console.log("Email поставщика:", targetProduct.supplier.contact.email);
        }
    }
}