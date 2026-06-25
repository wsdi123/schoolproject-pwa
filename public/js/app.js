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

function getCurrentLanguage() {
  const languageSelect = document.getElementById("language-switch");
  return languageSelect?.value || localStorage.getItem("language") || "en";
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

  const items = getItems();

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

  const categorieSelect = document.getElementById("categorie");
  if (categorieSelect) {
    categorieSelect.addEventListener("change", setValuePlaceholder);
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

document.addEventListener("language-updated", setValuePlaceholder);

// Alles resetten
function resetData() {
  if (!confirm("Weet je zeker dat je alles wilt verwijderen?")) {
    return;
  }

  localStorage.removeItem(STORAGE_KEY);

  renderItems();
}
