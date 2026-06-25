// LocalStorage sleutel
const STORAGE_KEY = "healthify_data";

// Data ophalen
function getItems() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// Data opslaan
function saveItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

const VALUE_PLACEHOLDER_PREFIX = "valuePlaceholder";
const DEFAULT_FILTER = "all";
let currentFilter = DEFAULT_FILTER;
let newestFirst = true;

function getCurrentLanguage() {
  return localStorage.getItem("language") || "en";
}

function getFilteredAndSortedItems(items) {
  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const oneDay = 24 * 60 * 60 * 1000;

  const filtered = items.filter((item) => {
    if (!item.datum) return false;
    const itemDate = new Date(item.datum);
    if (Number.isNaN(itemDate.getTime())) return false;

    switch (currentFilter) {
      case "day":
        return (
          itemDate.getTime() >= startOfToday.getTime() &&
          itemDate.getTime() < startOfToday.getTime() + oneDay
        );
      case "week":
        return (
          itemDate.getTime() >= startOfToday.getTime() - 6 * oneDay &&
          itemDate.getTime() < startOfToday.getTime() + oneDay
        );
      case "month":
        return (
          itemDate.getTime() >= startOfToday.getTime() - 29 * oneDay &&
          itemDate.getTime() < startOfToday.getTime() + oneDay
        );
      default:
        return true;
    }
  });

  return filtered.sort((a, b) => {
    const diff = new Date(a.datum) - new Date(b.datum);
    return newestFirst ? -diff : diff;
  });
}

function setActiveFilterButton() {
  const filterButtons = document.querySelectorAll(
    ".filter-buttons button[data-filter]",
  );
  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === currentFilter);
  });
}

function updateSortButtonLabel() {
  const sortButton = document.getElementById("sort-button");
  if (!sortButton) return;
  sortButton.textContent = newestFirst
    ? translations[getCurrentLanguage()].sortNewest
    : translations[getCurrentLanguage()].sortOldest;
}

function setValuePlaceholder() {
  const categorieSelect = document.getElementById("categorie");
  const waardeInput = document.getElementById("waarde");

  if (!categorieSelect || !waardeInput) return;

  const lang = getCurrentLanguage();
  const key = `${VALUE_PLACEHOLDER_PREFIX}${categorieSelect.value}`;
  const placeholder = translations?.[lang]?.[key] || "";

  waardeInput.placeholder = placeholder;
}

// Overzicht tonen
function renderItems() {
  const lijst = document.getElementById("items-lijst");

  if (!lijst) return;

  const items = getFilteredAndSortedItems(getItems());

  if (items.length === 0) {
    lijst.innerHTML = "<p>Geen gegevens gevonden.</p>";
    return;
  }

  lijst.innerHTML = items
    .map(
      (item) => `
        <div class="card">
            <h3>${item.categorie}</h3>
            <p><strong>Datum:</strong> ${item.datum}</p>
            <p><strong>Omschrijving:</strong> ${item.omschrijving}</p>
            <p><strong>Waarde:</strong> ${item.waarde}</p>

            <button class="delete-btn" data-id="${item.id}">
                Verwijderen
            </button>
        </div>
    `,
    )
    .join("");
}

// Formulier verwerken
document.addEventListener("DOMContentLoaded", () => {
  renderItems();
  setActiveFilterButton();
  updateSortButtonLabel();

  const categorieSelect = document.getElementById("categorie");
  if (categorieSelect) {
    categorieSelect.addEventListener("change", setValuePlaceholder);
  }

  const filterButtons = document.querySelectorAll(
    ".filter-buttons button[data-filter]",
  );
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentFilter = button.dataset.filter || DEFAULT_FILTER;
      setActiveFilterButton();
      renderItems();
    });
  });

  const sortButton = document.getElementById("sort-button");
  if (sortButton) {
    sortButton.addEventListener("click", () => {
      newestFirst = !newestFirst;
      updateSortButtonLabel();
      renderItems();
    });
  }

  setValuePlaceholder();

  const form = document.getElementById("health-form");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const datum = document.getElementById("datum").value;
      const categorie = document.getElementById("categorie").value;
      const omschrijving = document.getElementById("omschrijving").value.trim();
      const waarde = document.getElementById("waarde").value;

      const nieuwItem = {
        id: Date.now(),
        datum,
        categorie,
        omschrijving,
        waarde,
      };

      const items = getItems();
      items.push(nieuwItem);

      saveItems(items);

      alert("Gegevens opgeslagen!");

      form.reset();
      setValuePlaceholder();

      renderItems();
    });
  }

  // Delete
  document.addEventListener("click", (event) => {
    if (!event.target.classList.contains("delete-btn")) {
      return;
    }

    const id = Number(event.target.dataset.id);

    const items = getItems().filter((item) => item.id !== id);

    saveItems(items);

    renderItems();
  });
});

document.addEventListener("language-updated", () => {
  setValuePlaceholder();
  updateSortButtonLabel();
});

// Alles resetten
function resetData() {
  if (!confirm("Weet je zeker dat je alles wilt verwijderen?")) {
    return;
  }

  localStorage.removeItem(STORAGE_KEY);

  renderItems();
}
