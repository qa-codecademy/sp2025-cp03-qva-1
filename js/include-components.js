fetch("../components/navbar.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("navbar").innerHTML = data;

    const links = document.querySelectorAll(".nav-link");

    links.forEach((link) => {
      if (link.href === window.location.href) {
        link.classList.add("active");
      }
    });
  });

fetch("../components/footer.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data;

    const yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  });
