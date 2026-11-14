interface Product {
    id: number;
    title: string;
    price: number;
}

type HasCategory = { category: string };
type CatalogItem = Product & HasCategory;

const sampleCatalogItem: CatalogItem = {
    id: 10,
    title: "Keyboard",
    price: 3500,
    category: "Peripherals"
};

type CatalogState =
    | { status: "idle" }
    | { status: "loading"; startedAt: number }
    | { status: "success"; products: Product[]; loadedAt: number }
    | { status: "empty"; loadedAt: number }
    | { status: "error"; message: string; retryable: boolean };

function assertNever(value: never): never {
    throw new Error(`Необработанный вариант: ${value}`);
}

function getStateMessage(state: CatalogState): string {
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

const productsList: Product[] = [
    { id: 1, title: "Мышь", price: 1500 },
    { id: 2, title: "Монитор", price: 20000 }
];

const states: CatalogState[] = [
    { status: "idle" },
    { status: "loading", startedAt: 1000 },
    { status: "success", products: productsList, loadedAt: 1200 },
    { status: "empty", loadedAt: 1300 },
    { status: "error", message: "Сервер недоступен", retryable: true }
];

for (const state of states) {
    console.log(getStateMessage(state));
}


function formatValue(value: string | number): string {
    if (typeof value === "string") {
        return value.trim().toUpperCase();
    }

    return value.toFixed(2);
}

console.log(formatValue("sku-125"));
console.log(formatValue(125.5));

interface Book {
    title: string;
    pages: number;
}

interface VideoCourse {
    title: string;
    durationMinutes: number;
}

type LearningMaterial = Book | VideoCourse;

function describeMaterial(item: LearningMaterial): string {
    if ("pages" in item) {
        return `${item.title}: ${item.pages} страниц`;
    }

    return `${item.title}: ${item.durationMinutes} минут`;
}

console.log(describeMaterial({ title: "Основы TypeScript", pages: 250 }));
console.log(describeMaterial({ title: "Курс по TypeScript", durationMinutes: 180 }));

interface SearchOptions {
    query: string;
    maxPrice: number;
}

type SearchInput = string | SearchOptions;

function formatSearch(input: SearchInput): string {
    if (typeof input === "string") {
        return `Поиск по строке: ${input.trim()}`;
    }

    return `Поиск по параметрам: "${input.query}", цена до ${input.maxPrice}`;
}

console.log(formatSearch("  клавиатура "));
console.log(formatSearch({ query: "клавиатура", maxPrice: 5000 }));

function isProduct(value: Product | string): value is Product {
    return (
        typeof value !== "string" &&
        typeof value.id === "number" &&
        typeof value.title === "string" &&
        typeof value.price === "number"
    );
}

function getProductTitle(value: Product | string): string {
    if (isProduct(value)) {
        return `${value.title} (${value.price} руб.)`;
    }

    return value.toUpperCase();
}

console.log(getProductTitle({ id: 1, title: "Наушники", price: 4000 }));
console.log(getProductTitle("товар по акции"));