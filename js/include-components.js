fetch("../components/navbar.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("navbar").innerHTML = data;
    console.log(document.getElementById("navbar"));
    const links = document.querySelectorAll(".nav-link");

    links.forEach((link) => {
      console.log(link.href, window.location.href);
      if (link.href === window.location.href) {
        link.classList.add("active");
      }
    });

    const hamburger = document.getElementById("hamburger-menu");
    const navList = document.getElementById("nav-list");

    if (hamburger && navList) {
      hamburger.addEventListener("click", () => {
        navList.classList.toggle("show");
      });
    }
  });
