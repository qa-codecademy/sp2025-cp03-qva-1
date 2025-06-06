document.addEventListener("DOMContentLoaded", () => {
  const cardsPerPage = 4;

  function showPage(section, page) {
    const cardSelector = section === "event" ? ".event-card" : ".news-card";
    const containerSelector =
      section === "event" ? ".event-container" : ".news-container";
    const dotSelector = section === "event" ? ".event-dot" : ".news-dot";

    const container = document.querySelector(containerSelector);
    const cards = container.querySelectorAll(cardSelector);
    const dots = document.querySelectorAll(dotSelector);

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
      const section = dot.dataset.section;
      const page = parseInt(dot.dataset.page);
      showPage(section, page);
    });
  });

  showPage("event", 1);
  showPage("news", 1);

  function getStats() {
    return JSON.parse(localStorage.getItem("cardStats")) || {};
  }

  function saveStats(stats) {
    localStorage.setItem("cardStats", JSON.stringify(stats));
  }

  function updateStat(cardId, type, value) {
    const stats = getStats();
    stats[cardId] = stats[cardId] || { likes: 0, views: 0 };
    stats[cardId][type] = value;
    saveStats(stats);
  }

  function applyStatsFromStorage() {
    const stats = getStats();
    document.querySelectorAll(".event-card, .news-card").forEach((card) => {
      const id = card.dataset.id;
      const viewCount = card.querySelector(".view-count");
      const likeCount = card.querySelector(".like-count");
      const likeImg = card.querySelector(".like-icon img");

      if (stats[id]) {
        viewCount.textContent = stats[id].views;
        likeCount.textContent = stats[id].likes;
        likeImg.src =
          stats[id].likes > 0
            ? "../assets/icons/heart-solid.svg"
            : "../assets/icons/heart-regular.svg";
      }
    });
  }

  document.querySelectorAll(".event-card, .news-card").forEach((card) => {
    const viewIcon = card.querySelector(".view-icon");
    const likeIcon = card.querySelector(".like-icon");
    const cardId = card.dataset.id;

    card.addEventListener("click", (e) => {
      if (e.target.closest(".like-icon")) return;

      const viewCountEl = card.querySelector(".view-count");
      let views = parseInt(viewCountEl.textContent) || 0;
      views++;
      viewCountEl.textContent = views;
      updateStat(cardId, "views", views);

      const img = card.querySelector(".news-image, .event-image").src;
      const title =
        card.querySelector(".news-title, .event-title")?.textContent || "";
      const date =
        card.querySelector(".news-date, .event-date")?.textContent || "";
      const likes = card.querySelector(".like-count")?.textContent || "0";

      const popup = document.getElementById("popup-overlay");
      popup.querySelector(".popup-image").src = img;
      popup.querySelector(".popup-title").textContent = title;
      popup.querySelector(".popup-date").textContent = date;
      const desc =
        card.querySelector(".full-description")?.textContent.trim() || "";
      popup.querySelector(".popup-description").textContent = desc;

      popup.querySelector(".popup-view-count").textContent = views;
      popup.querySelector(".popup-like-count").textContent = likes;

      const likeImg = likeIcon.querySelector("img").src;
      const popupLikeIcon = popup.querySelector(".popup-like-icon");
      popupLikeIcon.src = likeImg.includes("heart-solid.svg")
        ? "../assets/icons/heart-solid.svg"
        : "../assets/icons/heart-regular.svg";

      popup.dataset.cardId = cardId;
      popup.classList.remove("hidden");
    });

    likeIcon.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const img = likeIcon.querySelector("img");
      const countEl = likeIcon.querySelector(".like-count");
      let count = parseInt(countEl.textContent) || 0;

      if (img.src.includes("heart-regular.svg")) {
        img.src = "../assets/icons/heart-solid.svg";
        count++;
      } else {
        img.src = "../assets/icons/heart-regular.svg";
        count--;
      }

      countEl.textContent = count;
      updateStat(cardId, "likes", count);
    });
  });

  document.querySelector(".popup-close").addEventListener("click", () => {
    document.getElementById("popup-overlay").classList.add("hidden");
  });

  document.querySelector(".popup-like-icon").addEventListener("click", () => {
    const popup = document.getElementById("popup-overlay");
    const cardId = popup.dataset.cardId;
    const popupLikeIcon = popup.querySelector(".popup-like-icon");
    const popupLikeCount = popup.querySelector(".popup-like-count");

    let count = parseInt(popupLikeCount.textContent) || 0;
    const isLiked = popupLikeIcon.src.includes("heart-solid.svg");

    popupLikeIcon.src = isLiked
      ? "../assets/icons/heart-regular.svg"
      : "../assets/icons/heart-solid.svg";
    popupLikeCount.textContent = isLiked ? --count : ++count;

    updateStat(cardId, "likes", count);

    const targetCard = document.querySelector(
      `.event-card[data-id="${cardId}"], .news-card[data-id="${cardId}"]`
    );

    if (targetCard) {
      const cardLikeImg = targetCard.querySelector(".like-icon img");
      const cardLikeCount = targetCard.querySelector(".like-count");

      cardLikeImg.src = popupLikeIcon.src;
      cardLikeCount.textContent = popupLikeCount.textContent;
    }
  });

  applyStatsFromStorage();
});
