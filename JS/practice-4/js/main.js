import { loadExpenses, saveExpenses } from './storage.js';
import { renderExpenses } from './render.js';

let expenses = loadExpenses();

const form = document.getElementById('expense-form');
const titleInput = document.getElementById('title-input');
const amountInput = document.getElementById('amount-input');
const filterSelect = document.getElementById('filter-select');
const listElement = document.getElementById('expenses-list');
const totalElement = document.getElementById('total-amount');

function updateApp() {
    const filterValue = filterSelect.value;
    
    let visibleExpenses = expenses;
    if (filterValue === 'large') {
        visibleExpenses = expenses.filter(item => item.amount > 1000);
    }

    renderExpenses(visibleExpenses, listElement, totalElement);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const amount = Number(amountInput.value);

    if (!title || isNaN(amount) || amount <= 0) {
        alert('Пожалуйста, введите корректное название и сумму.');
        return;
    }

    const newExpense = {
        id: Date.now(),
        title: title,
        amount: amount
    };

    expenses.push(newExpense);
    saveExpenses(expenses);
    updateApp();

    titleInput.value = '';
    amountInput.value = '';
});

listElement.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const idToDelete = Number(e.target.dataset.id);
        expenses = expenses.filter(item => item.id !== idToDelete);
        saveExpenses(expenses);
        updateApp();
    }
});

filterSelect.addEventListener('change', updateApp);

updateApp();