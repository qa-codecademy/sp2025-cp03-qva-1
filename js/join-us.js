const joinForm = document.querySelector("#membershipForm");
const thankYouBox = document.querySelector("#thankYouMessage");
const phoneInput = joinForm.querySelector("#phone");

phoneInput.addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9]/g, "");
});

joinForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const fieldsToTrim = joinForm.querySelectorAll(
    'input[type="text"], input[type="email"], input[type="url"], textarea'
  );

  fieldsToTrim.forEach((field) => {
    field.value = field.value.trim();
  });

  const data = {
    firstName: joinForm.querySelector("#firstName").value,
    lastName: joinForm.querySelector("#lastName").value,
    email: joinForm.querySelector("#email").value,
    phone: joinForm.querySelector("#phone").value,
    city: joinForm.querySelector("#city").value,
    motivation: joinForm.querySelector("#motivation").value,
  };

  console.log("Form submitted:", data);

  joinForm.reset();
  thankYouBox.classList.remove("hidden");

  thankYouBox.scrollIntoView({
    behavior: "smooth",
  });
});

window.addEventListener("beforeunload", () => {
  thankYouBox.classList.add("hidden");
});
