const STORAGE_KEY = 'expenses_data';

export function loadExpenses() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    
    try {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        console.error('Ошибка чтения данных, сброс к пустому списку', e);
        return [];
    }
}

export function saveExpenses(expenses) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}