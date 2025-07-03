let languageMap = {};
const lang = localStorage.getItem("lang") || "en";
console.log(lang);

fetch(`../lang/${lang}.json`)
  .then((res) => res.json())
  .then((translations) => {
    languageMap = translations;
  });

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

  function attachViewDetailsListeners() {
    document.querySelectorAll(".view-details").forEach((btn, index) => {
      btn.addEventListener("click", (e) => {
        const card = e.target.closest(".project-box");

        const title = card.querySelector("h3").textContent;
        const imgSrc = card.querySelector("img").src;
        const shortDesc = card.querySelector("p").textContent;

        titleEl.setAttribute("data-i18n", `project_title_${index}`);
        titleEl.textContent = title;
        imageEl.src = imgSrc;
        para1El.textContent = shortDesc;
        para2El.setAttribute("data-i18n", "project_long_description");
        para2El.textContent = languageMap["project_long_description"];

        history.pushState({ view: "details" }, "", "#project-details");

        projectPage.style.display = "none";
        hero.style.display = "none";
        projectDetails.classList.add("active");

        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  function updateDisplay() {
    const language = localStorage.getItem("lang") || "en";
    fetch(`../lang/${language}.json`)
      .then((res) => res.json())
      .then((translations) => {
        projectContainer.innerHTML = "";
        const visible = filteredProjects.slice(0, currentVisibleCount);

        visible.forEach((card, index) => {
          const title = card.querySelector("h3");
          const text = card.querySelector("p");
          const btn = card.querySelector("button");

          title.textContent = translations[`project_title_${index}`];
          text.textContent = translations[`project_text_${index}`];
          btn.textContent = translations["view_details"];

          card.style.display = "flex";
          projectContainer.appendChild(card);
        });

        if (currentVisibleCount >= filteredProjects.length) {
          showMoreButton.disabled = true;
          showMoreButton.classList.add("disabled");
          showMoreButton.setAttribute("data-i18n", "no_more_projects");
          showMoreButton.textContent = translations["no_more_projects"];
        } else {
          showMoreButton.disabled = false;
          showMoreButton.classList.remove("disabled");
          showMoreButton.setAttribute("data-i18n", "show_more");
          showMoreButton.textContent = "SHOW MORE";
        }

        attachViewDetailsListeners();
      });
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
      const title = card.querySelector("h3").textContent.toLowerCase();
      return title.includes(searchQuery);
    });

    switch (sortOption) {
      case "title-asc":
        filteredProjects.sort((a, b) =>
          a
            .querySelector("h3")
            .textContent.localeCompare(b.querySelector("h3").textContent)
        );
        break;
      case "title-desc":
        filteredProjects.sort((a, b) =>
          b
            .querySelector("h3")
            .textContent.localeCompare(a.querySelector("h3").textContent)
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

  resetAndDisplay();

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
