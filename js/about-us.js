document.addEventListener("DOMContentLoaded", () => {
  const cardsPerPage = 3;

  function showMembersPage(page) {
    const cards = document.querySelectorAll(".member-card");
    const dots = document.querySelectorAll(".dot");
    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;

    if (start >= cards.length) return;

    cards.forEach((card, index) => {
      card.style.display = index >= start && index < end ? "flex" : "none";
    });

    dots.forEach((dot) => {
      dot.classList.toggle("active", parseInt(dot.dataset.page) === page);
    });
  }

  document.querySelectorAll(".dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      const page = parseInt(dot.dataset.page);
      const cards = document.querySelectorAll(".member-card");
      const start = (page - 1) * cardsPerPage;

      if (start < cards.length) {
        showMembersPage(page);
      }
    });
  });

  showMembersPage(1);
});
