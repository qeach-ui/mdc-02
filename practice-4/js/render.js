export function renderExpenses(expenses, listElement, totalElement) {
    listElement.innerHTML = '';

    let total = 0;

    if (expenses.length === 0) {
        listElement.innerHTML = '<li>Записей пока нет</li>';
    } else {
        expenses.forEach(item => {
            total += item.amount;

            const li = document.createElement('li');
            li.innerHTML = `
                <span><strong>${item.title}</strong>: ${item.amount} ₽</span>
                <button class="delete-btn" data-id="${item.id}">Удалить</button>
            `;
            listElement.appendChild(li);
        });
    }

    totalElement.textContent = total.toFixed(2);
}