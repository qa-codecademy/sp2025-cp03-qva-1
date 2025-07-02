document.addEventListener("DOMContentLoaded", () => {
  const cardsPerPage = 3;

  function generateMemberDots() {
    const cards = document.querySelectorAll(".member-card");
    const dotsWrapper = document.querySelector(".pagination-dots");

    const totalPages = Math.ceil(cards.length / cardsPerPage);
    dotsWrapper.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const dot = document.createElement("button");
      dot.classList.add("dot");
      dot.dataset.page = i;
      if (i === 1) dot.classList.add("active");

      dot.addEventListener("click", () => {
        showMembersPage(i);
      });

      dotsWrapper.appendChild(dot);
    }
  }

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

  generateMemberDots();
  showMembersPage(1);
});
