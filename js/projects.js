let languageMap = {};

document.addEventListener("DOMContentLoaded", () => {
  const allProjectBoxes = Array.from(document.querySelectorAll(".project-box"));
  const projectContainer = document.querySelector(".project-container");
  const showMoreButton = document.querySelector(".show-more");
  const projectPage = document.querySelector(".project-page");
  const projectDetails = document.querySelector(".project-details-section");
  const hero = document.getElementById("hero-projects");

  const titleEl = document.querySelector(".project-details-title");
  const imageEl = document.querySelector(".project-details-img img");
  const para1El = document.querySelector(".project-paragraph-1");
  const para2El = document.querySelector(".project-paragraph-2");
  const backLink = document.querySelector(".project-back-button");

  const searchInput = document.getElementById("project-search");
  const sortSelect = document.getElementById("project-sort");

  const cardsPerBatch = 6;
  let currentVisibleCount = 0;
  let filteredProjects = [...allProjectBoxes];

  function updateTranslatedTitles() {
    allProjectBoxes.forEach((card, index) => {
      const key = `project_title_${index}`;
      const translatedTitle =
        languageMap[key] || card.querySelector("h3").textContent;
      card.setAttribute("data-title", translatedTitle.toLowerCase());
    });
  }

  function attachViewDetailsListeners() {
    document.querySelectorAll(".view-details").forEach((btn, index) => {
      btn.addEventListener("click", (e) => {
        const card = e.target.closest(".project-box");

        const originalIndex = allProjectBoxes.indexOf(card);

        titleEl.setAttribute("data-i18n", `project_title_${originalIndex}`);
        imageEl.src = card.querySelector("img").src;
        para1El.setAttribute("data-i18n", `project_text_${originalIndex}`);
        para2El.setAttribute("data-i18n", "project_long_description");

        history.pushState({ view: "details" }, "", "#project-details");
        projectPage.style.display = "none";
        hero.style.display = "none";
        projectDetails.classList.add("active");

        window.scrollTo({ top: 0, behavior: "smooth" });

        applyTranslations();
      });
    });
  }

  function updateDisplay() {
    projectContainer.innerHTML = "";
    const visible = filteredProjects.slice(0, currentVisibleCount);

    visible.forEach((card) => {
      const originalIndex = allProjectBoxes.indexOf(card);

      const title = card.querySelector("h3");
      const text = card.querySelector("p");
      const btn = card.querySelector("button");

      title.textContent =
        languageMap[`project_title_${originalIndex}`] || title.textContent;
      text.textContent =
        languageMap[`project_text_${originalIndex}`] || text.textContent;
      btn.textContent = languageMap["view_details"] || btn.textContent;

      card.style.display = "flex";
      projectContainer.appendChild(card);
    });

    if (currentVisibleCount >= filteredProjects.length) {
      showMoreButton.disabled = true;
      showMoreButton.classList.add("disabled");
      showMoreButton.textContent =
        languageMap["no_more_projects"] || "No more projects";
    } else {
      showMoreButton.disabled = false;
      showMoreButton.classList.remove("disabled");
      showMoreButton.textContent = languageMap["show_more"] || "Show More";
    }

    attachViewDetailsListeners();
  }

  function showNextProjects() {
    currentVisibleCount += cardsPerBatch;
    updateDisplay();
  }

  function resetAndDisplay() {
    currentVisibleCount = cardsPerBatch;
    updateDisplay();
  }

  function filterAndSortProjects() {
    const searchQuery = searchInput.value.toLowerCase();
    const sortOption = sortSelect.value;

    filteredProjects = allProjectBoxes.filter((card) => {
      const title = card.getAttribute("data-title") || "";
      return title.includes(searchQuery);
    });

    switch (sortOption) {
      case "title-asc":
        filteredProjects.sort((a, b) =>
          a
            .getAttribute("data-title")
            .localeCompare(b.getAttribute("data-title"))
        );
        break;
      case "title-desc":
        filteredProjects.sort((a, b) =>
          b
            .getAttribute("data-title")
            .localeCompare(a.getAttribute("data-title"))
        );
        break;
      case "latest":
        filteredProjects.sort(
          (a, b) => allProjectBoxes.indexOf(b) - allProjectBoxes.indexOf(a)
        );
        break;
      case "oldest":
        filteredProjects.sort(
          (a, b) => allProjectBoxes.indexOf(a) - allProjectBoxes.indexOf(b)
        );
        break;
      default:
        break;
    }

    resetAndDisplay();
  }

  function initialize() {
    languageMap = window.languageMap || {};
    updateTranslatedTitles();
    filterAndSortProjects();
  }

  document.addEventListener("languageChanged", () => {
    languageMap = window.languageMap || {};
    updateTranslatedTitles();
    filterAndSortProjects();
  });

  initialize();

  showMoreButton.addEventListener("click", showNextProjects);
  searchInput.addEventListener("input", filterAndSortProjects);
  sortSelect.addEventListener("change", filterAndSortProjects);

  backLink.addEventListener("click", (e) => {
    e.preventDefault();
    history.back();
  });

  window.addEventListener("popstate", (e) => {
    if (projectDetails.classList.contains("active")) {
      projectDetails.classList.remove("active");
      projectPage.style.display = "flex";
      hero.style.display = "flex";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
});
