document.addEventListener("DOMContentLoaded", () => {
  const maxWords = 30;

  document.querySelectorAll(".text-content p").forEach((p) => {
    const text = p.textContent.trim();

    const words = text.split(/\s+/).filter(Boolean);

    if (words.length > maxWords) {
      const trimmed = words.slice(0, maxWords).join(" ");
      p.textContent = trimmed + ". . .";
    }
  });
});
