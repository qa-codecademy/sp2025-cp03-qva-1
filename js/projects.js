document.addEventListener("DOMContentLoaded", () => {
  const allProjectBoxes = Array.from(document.querySelectorAll(".project-box"));
  const showMoreButton = document.querySelector(".show-more");
  const projectPage = document.querySelector(".project-page");
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
    }
  }

  allProjectBoxes.forEach((card) => (card.style.display = "none"));
  showNextProjects();

  showMoreButton.addEventListener("click", showNextProjects);

  document.querySelectorAll(".view-details").forEach((btn) => {
    btn.addEventListener("click", () => {
      const projectDetails = document.querySelector(".project-details");
      projectPage.style.display = "none";
      projectDetails.style.display = "flex";
    });
  });
});
