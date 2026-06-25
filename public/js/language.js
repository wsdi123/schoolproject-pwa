const translations = {
  en: {
    home: "Home",
    add: "Add",
    overview: "Overview",
    subtitle: "Track your health and fitness goals",
    welcome: "Welcome to Healthify",
    welcomeText:
      "Healthify helps you track your exercise, nutrition, sleep and water intake.",
    startTracking: "Start Tracking",
    stats: "Quick Statistics",
    entries: "Total Entries",
    categories: "Categories",
    overviewSubtitle: "View your saved health activities",
    overviewText: "View all your saved health activities.",
    filters: "Filters",
    statistics: "Statistics",
    totalItems: "Total Items",
    averageValue: "Average Value",
    highestValue: "Highest Value",
    lowestValue: "Lowest Value",
    categoryCounts: "Category counts",
    noCategoryCounts: "No categories",
    savedItems: "Saved Activities",
    all: "All",
    today: "Today",
    week: "Week",
    month: "Month",
    deleteAll: "Delete All Data",
    sortNewest: "Newest first",
    sortOldest: "Oldest first",
    addSubtitle: "Add a new health activity",
    addActivity: "Add Activity",
    date: "Date",
    category: "Category",
    description: "Description",
    value: "Value",
    save: "Save Activity",
    descriptionPlaceholder: "Example: morning run or salad",
    descriptionPlaceholderExercise: "Example: morning run or gym session",
    descriptionPlaceholderNutrition: "Example: salad, pizza or snack",
    descriptionPlaceholderSleep: "Example: good night’s sleep or nap",
    descriptionPlaceholderWater: "Example: 2 glasses or a bottle of water",
    valuePlaceholderExercise: "Minutes of exercise (30)",
    valuePlaceholderNutrition: "Calories (650)",
    valuePlaceholderSleep: "Hours of sleep (8)",
    valuePlaceholderWater: "Glasses or ml water (2000)",
    exercise: "Exercise",
    nutrition: "Nutrition",
    sleep: "Sleep",
    water: "Water",
  },
  nl: {
    home: "Home",
    add: "Toevoegen",
    overview: "Overzicht",
    subtitle: "Volg je gezondheid en fitnessdoelen",
    welcome: "Welkom bij Healthify",
    welcomeText:
      "Healthify helpt je met het volgen van je beweging, voeding, slaap en waterinname.",
    startTracking: "Start met bijhouden",
    stats: "Snel overzicht",
    entries: "Totaal aantal items",
    categories: "Categorieën",
    addSubtitle: "Voeg een nieuwe gezondheidsactiviteit toe",
    addActivity: "Activiteit toevoegen",
    overviewSubtitle: "Bekijk je opgeslagen gezondheidsactiviteiten",
    overviewText: "Bekijk al je opgeslagen gezondheidsactiviteiten.",
    filters: "Filters",
    statistics: "Statistieken",
    totalItems: "Totaal aantal items",
    averageValue: "Gemiddelde waarde",
    highestValue: "Hoogste waarde",
    lowestValue: "Laagste waarde",
    categoryCounts: "Telling per categorie",
    noCategoryCounts: "Geen categorieën",
    savedItems: "Opgeslagen activiteiten",
    all: "Alles",
    today: "Vandaag",
    week: "Week",
    month: "Maand",
    deleteAll: "Verwijder alle gegevens",
    sortNewest: "Nieuwste eerst",
    sortOldest: "Oudste eerst",
    date: "Datum",
    category: "Categorie",
    description: "Omschrijving",
    value: "Waarde",
    save: "Activiteit opslaan",
    descriptionPlaceholder: "Voorbeeld: ochtendrun of salade",
    descriptionPlaceholderExercise: "Voorbeeld: ochtendrun of sportsessie",
    descriptionPlaceholderNutrition: "Voorbeeld: salade, pizza of snack",
    descriptionPlaceholderSleep: "Voorbeeld: goede nacht slapen of middagdutje",
    descriptionPlaceholderWater: "Voorbeeld: 2 glazen of een fles water",
    valuePlaceholderExercise: "Minuten gesport (30)",
    valuePlaceholderNutrition: "Calorieën (650)",
    valuePlaceholderSleep: "Uren slaap (8)",
    valuePlaceholderWater: "Glazen van ml water (2000)",
    exercise: "Sport",
    nutrition: "Voeding",
    sleep: "Slaap",
    water: "Water",
  },
};

const languageButton = document.getElementById("language-button");
const languageMenu = document.getElementById("language-menu");
const languageOptions = document.querySelectorAll(".language-option");
const DEFAULT_LANGUAGE = "en";

const savedLanguage = localStorage.getItem("language") || DEFAULT_LANGUAGE;
setLanguage(savedLanguage);
updateLanguageButton(savedLanguage);

if (languageButton) {
  languageButton.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleLanguageMenu();
  });
}

if (languageMenu) {
  languageMenu.addEventListener("click", (event) => {
    const option = event.target.closest(".language-option");
    if (!option) return;

    const lang = option.dataset.lang;
    if (!lang) return;

    localStorage.setItem("language", lang);
    setLanguage(lang);
    updateLanguageButton(lang);
    closeLanguageMenu();
  });

  languageMenu.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLanguageMenu();
      languageButton?.focus();
    }
    if (event.key === "Enter" || event.key === " ") {
      const option = event.target.closest(".language-option");
      if (!option) return;

      const lang = option.dataset.lang;
      if (!lang) return;

      localStorage.setItem("language", lang);
      setLanguage(lang);
      updateLanguageButton(lang);
      closeLanguageMenu();
    }
  });
}

document.addEventListener("click", () => {
  closeLanguageMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLanguageMenu();
  }
});

function setLanguage(lang) {
  document.querySelectorAll("[data-translate]").forEach((element) => {
    const key = element.dataset.translate;
    const translation = translations[lang][key];

    if (!translation) return;

    if (element.tagName === "OPTION") {
      const emoji = element.dataset.emoji ? `${element.dataset.emoji} ` : "";
      element.textContent = `${emoji}${translation}`;
    } else {
      element.textContent = translation;
    }
  });

  const omschrijving = document.getElementById("omschrijving");
  if (omschrijving) {
    omschrijving.placeholder = translations[lang].descriptionPlaceholder;
  }

  updateLanguageButton(lang);
  document.dispatchEvent(new Event("language-updated"));
}

function updateLanguageButton(lang) {
  if (!languageButton) return;

  const label = lang === "nl" ? "🇳🇱 NL" : "🇬🇧 EN";
  const labelSpan = languageButton.querySelector(".language-label");
  if (labelSpan) {
    labelSpan.textContent = label;
  }

  if (languageMenu) {
    languageOptions.forEach((option) => {
      const active = option.dataset.lang === lang;
      option.classList.toggle("active", active);
      option.setAttribute("aria-selected", active ? "true" : "false");
    });
  }
}

function toggleLanguageMenu() {
  if (!languageMenu) return;
  const open = languageMenu.classList.toggle("open");
  languageMenu.parentElement?.classList.toggle("open", open);
  languageButton?.setAttribute("aria-expanded", open ? "true" : "false");
}

function closeLanguageMenu() {
  if (!languageMenu) return;
  languageMenu.classList.remove("open");
  languageMenu.parentElement?.classList.remove("open");
  languageButton?.setAttribute("aria-expanded", "false");
}
