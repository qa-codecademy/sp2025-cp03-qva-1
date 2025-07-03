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

function changeLanguage(lang) {
  if (!lang) return;
  localStorage.setItem("lang", lang);
  loadLanguage(lang);
}

function loadLanguage(lang) {
  fetch(`../lang/${lang}.json`)
    .then((res) => res.json())
    .then((translations) => {
      const projectDetailsInput = document.querySelector("#project-search");
      projectDetailsInput.placeholder = translations["projects_search_input"];
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (translations[key]) {
          el.textContent = translations[key];
        }
      });

      const pageTitle = document.querySelector("title[data-i18n]");
      if (pageTitle) {
        const titleKey = pageTitle.getAttribute("data-i18n");
        if (translations[titleKey]) {
          pageTitle.textContent = translations[titleKey];
        }
      }
      trimParagraphs();
    })
    .catch((error) => {
      console.error("Failed to load language file:", error);
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
