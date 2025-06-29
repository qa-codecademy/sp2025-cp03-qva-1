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

  function updateDisplay() {
    projectContainer.innerHTML = "";
    const visible = filteredProjects.slice(0, currentVisibleCount);

    visible.forEach((card) => {
      card.style.display = "flex";
      projectContainer.appendChild(card);
    });

    if (currentVisibleCount >= filteredProjects.length) {
      showMoreButton.disabled = true;
      showMoreButton.classList.add("disabled");
      showMoreButton.textContent = "NO MORE PROJECTS";
    } else {
      showMoreButton.disabled = false;
      showMoreButton.classList.remove("disabled");
      showMoreButton.textContent = "SHOW MORE";
    }
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

  document.querySelectorAll(".view-details").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".project-box");

      const title = card.querySelector("h3").textContent;
      const imgSrc = card.querySelector("img").src;
      const shortDesc = card.querySelector("p").textContent;

      const longDesc = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`;

      titleEl.textContent = title;
      imageEl.src = imgSrc;
      para1El.textContent = shortDesc;
      para2El.textContent = longDesc;

      projectPage.style.display = "none";
      hero.style.display = "none";
      projectDetails.classList.add("active");

      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  backLink.addEventListener("click", (e) => {
    e.preventDefault();
    projectDetails.classList.remove("active");
    projectPage.style.display = "flex";
    hero.style.display = "flex";
  });
});
