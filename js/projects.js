document.addEventListener("DOMContentLoaded", () => {
  const allProjectBoxes = Array.from(document.querySelectorAll(".project-box"));
  const showMoreButton = document.querySelector(".show-more");
  const projectPage = document.querySelector(".project-page");
  const projectDetails = document.querySelector(".project-details");

  const titleEl = projectDetails.querySelector(".details-title");
  const imageEl = projectDetails.querySelector(".details-image");
  const para1El = projectDetails.querySelector(".details-paragraph-1");
  const para2El = projectDetails.querySelector(".details-paragraph-2");
  const backLink = projectDetails.querySelector(".back-link");

  const cardsPerBatch = 6;
  let currentVisibleCount = 0;

  function showNextProjects() {
    const nextBatch = allProjectBoxes.slice(
      currentVisibleCount,
      currentVisibleCount + cardsPerBatch
    );

    nextBatch.forEach((card) => {
      card.style.display = "flex";
    });

    currentVisibleCount += nextBatch.length;

    if (currentVisibleCount >= allProjectBoxes.length) {
      showMoreButton.disabled = true;
      showMoreButton.classList.add("disabled");
      showMoreButton.textContent = "NO MORE PROJECTS";
    }
  }

  allProjectBoxes.forEach((card) => (card.style.display = "none"));
  showNextProjects();

  showMoreButton.addEventListener("click", showNextProjects);

  document.querySelectorAll(".view-details").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".project-box");

      const title = card.querySelector("h3").textContent;
      const imgSrc = card.querySelector("img").src;
      const shortDesc = card.querySelector("p").textContent;

      const longDesc = `This is a longer description about the "${title}" project. It provides more details about the project's purpose, goals, and activities.`;

      titleEl.textContent = title;
      imageEl.src = imgSrc;
      para1El.textContent = shortDesc;
      para2El.textContent = longDesc;

      projectPage.style.display = "none";
      projectDetails.style.display = "flex";
    });
  });

  backLink.addEventListener("click", (e) => {
    e.preventDefault();
    projectDetails.style.display = "none";
    projectPage.style.display = "flex";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const allProjectBoxes = Array.from(document.querySelectorAll(".project-box"));
  const showMoreButton = document.querySelector(".show-more");
  const projectPage = document.querySelector(".project-page");
  const projectDetails = document.querySelector(".project-details-section");
  const hero = document.getElementById("hero-projects");

  const titleEl = document.querySelector(".project-details-title");
  const imageEl = document.querySelector(".project-details-img img");
  const para1El = document.querySelector(".project-paragraph-1");
  const para2El = document.querySelector(".project-paragraph-2");
  const backLink = document.querySelector(".project-back-button");

  const cardsPerBatch = 6;
  let currentVisibleCount = 0;

  function showNextProjects() {
    const nextBatch = allProjectBoxes.slice(
      currentVisibleCount,
      currentVisibleCount + cardsPerBatch
    );

    nextBatch.forEach((card) => {
      card.style.display = "flex";
    });

    currentVisibleCount += nextBatch.length;

    if (currentVisibleCount >= allProjectBoxes.length) {
      showMoreButton.disabled = true;
      showMoreButton.classList.add("disabled");
      showMoreButton.textContent = "NO MORE PROJECTS";
    }
  }

  allProjectBoxes.forEach((card) => (card.style.display = "none"));
  showNextProjects();

  showMoreButton.addEventListener("click", showNextProjects);

  document.querySelectorAll(".view-details").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".project-box");

      const title = card.querySelector("h3").textContent;
      const imgSrc = card.querySelector("img").src;
      const shortDesc = card.querySelector("p").textContent;

      const longDesc = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

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
