const translations = {
  en: {
    home: "Home",
    add: "Add",
    overview: "Overview",
    addSubtitle: "Add a new health activity",
    addActivity: "Add Activity",
    date: "Date",
    category: "Category",
    description: "Description",
    value: "Value",
    save: "Save Activity",
    descriptionPlaceholder: "Example: 30 minute run",
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
    addSubtitle: "Voeg een nieuwe gezondheidsactiviteit toe",
    addActivity: "Activiteit toevoegen",
    date: "Datum",
    category: "Categorie",
    description: "Omschrijving",
    value: "Waarde",
    save: "Activiteit opslaan",
    descriptionPlaceholder: "Voorbeeld: 30 minuten hardlopen",
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

const languageSelect = document.getElementById("language-switch");

if (languageSelect) {
  const savedLanguage = localStorage.getItem("language") || "en";

  languageSelect.value = savedLanguage;

  setLanguage(savedLanguage);

  languageSelect.addEventListener("change", () => {
    localStorage.setItem("language", languageSelect.value);

    setLanguage(languageSelect.value);
  });
}

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

  document.dispatchEvent(new Event("language-updated"));
}
