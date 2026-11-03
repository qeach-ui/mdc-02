const form = document.querySelector("#form");
const input = document.querySelector("#input");
const statusEl = document.querySelector("#status");
const listEl = document.querySelector("#list");

async function searchCocktails(name) {
  statusEl.textContent = "Загрузка...";
  listEl.replaceChildren();

  try {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(name)}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();

    if (!Array.isArray(data.drinks)) {
      statusEl.textContent = "Ничего не найдено.";
      return;
    }

    for (const drink of data.drinks) {
      const card = document.createElement("div");

      const title = document.createElement("h2");
      title.textContent = drink.strDrink;

      const img = document.createElement("img");
      img.src = drink.strDrinkThumb;
      img.alt = drink.strDrink;
      img.width = 150;

      card.append(title, img);
      listEl.append(card);
    }

    statusEl.textContent = `Найдено: ${data.drinks.length}`;
  } catch (error) {
    console.error(error);
    statusEl.textContent = "Ошибка загрузки. Попробуйте ещё раз.";
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = input.value.trim();
  if (!title) return;
  searchCocktails(title);
});