const form = document.querySelector(".form");
const phoneInput = document.querySelector(".phone");

phoneInput.addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9]/g, "");
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const firstName = form.querySelector(".first-name").value.trim();
  const lastName = form.querySelector(".last-name").value.trim();
  const email = form.querySelector(".email").value.trim();
  const phone = form.querySelector(".phone").value.trim();

  console.log("Form submitted!");
  console.log({ firstName, lastName, email, phone });

  form.reset();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
