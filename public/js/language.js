const translations = {
  en: {
    home: "Home",
    add: "Add",
    overview: "Overview",
  },
  nl: {
    home: "Home",
    add: "Toevoegen",
    overview: "Overzicht",
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

    element.textContent = translations[lang][key];
  });
}
