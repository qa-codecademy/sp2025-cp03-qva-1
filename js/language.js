window.languageMap = {};

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (window.languageMap[key]) {
      el.textContent = window.languageMap[key];
    }
  });

  const projectDetailsInput = document.querySelector("#project-search");
  if (projectDetailsInput && window.languageMap["projects_search_input"]) {
    projectDetailsInput.placeholder =
      window.languageMap["projects_search_input"];
  }

  const pageTitle = document.querySelector("title[data-i18n]");
  if (pageTitle) {
    const titleKey = pageTitle.getAttribute("data-i18n");
    if (window.languageMap[titleKey]) {
      pageTitle.textContent = window.languageMap[titleKey];
    }
  }
}

function loadLanguage(lang) {
  fetch(`../lang/${lang}.json`)
    .then((res) => res.json())
    .then((translations) => {
      window.languageMap = translations;
      applyTranslations();

      document.dispatchEvent(new Event("languageChanged"));

      if (typeof window.validateForm === "function") {
        window.validateForm({ silent: true });
      }
      if (typeof window.validateJoinForm === "function") {
        window.validateJoinForm({ silent: true });
      }
    })
    .catch((error) => {
      console.error("Failed to load language file:", error);
    });
}

function changeLanguage(lang) {
  if (!lang) return;
  localStorage.setItem("lang", lang);
  loadLanguage(lang);
}

function setupLanguageDropdown() {
  const langToggle = document.getElementById("lang-toggle");
  const langOptions = document.getElementById("lang-options");
  const langButtons = document.querySelectorAll("#lang-options li");

  if (langToggle && langOptions) {
    langToggle.addEventListener("click", () => {
      langOptions.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (!document.querySelector(".language-selector")?.contains(e.target)) {
        langOptions.classList.remove("show");
      }
    });

    langButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const selectedLang = btn.getAttribute("data-lang");
        if (selectedLang) {
          changeLanguage(selectedLang);
          langOptions.classList.remove("show");
        }
      });
    });
  }
}

function setupFlagListeners() {
  const flagIcons = document.querySelectorAll(".lang-flag");
  flagIcons.forEach((flag) => {
    flag.addEventListener("click", () => {
      const selectedLang = flag.getAttribute("data-lang");
      if (selectedLang) {
        changeLanguage(selectedLang);
      }
    });
  });
}

function trimParagraphs() {
  const maxWords = 30;
  document.querySelectorAll(".text-content p").forEach((p) => {
    const text = p.textContent.trim();
    const words = text.split(/\s+/).filter(Boolean);
    if (words.length > maxWords) {
      const trimmed = words.slice(0, maxWords).join(" ");
      p.textContent = trimmed + " ...";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "en";
  loadLanguage(savedLang);
  setupLanguageDropdown();
  setupFlagListeners();
});
