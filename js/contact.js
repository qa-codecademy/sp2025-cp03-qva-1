const form = document.querySelector(".form");
const phoneInput = document.querySelector(".phone");
const thankYouBox = document.querySelector("#contactThankYou");
const contactFormWrapper = document.querySelector(".contact-form");

phoneInput.addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9]/g, "");
});

const nameRegex = /^[\p{L}\s'-]{2,}$/u;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const firstNameInput = form.querySelector(".first-name");
  const lastNameInput = form.querySelector(".last-name");
  const emailInput = form.querySelector(".email");
  const phoneInput = form.querySelector(".phone");

  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();

  form.querySelectorAll(".error-message").forEach((el) => el.remove());

  let isValid = true;
  let firstInvalidField = null;

  if (!nameRegex.test(firstName)) {
    isValid = false;
    showError(firstNameInput, "Only letters allowed.");
    if (!firstInvalidField) firstInvalidField = firstNameInput;
  }

  if (!nameRegex.test(lastName)) {
    isValid = false;
    showError(lastNameInput, "Only letters allowed.");
    if (!firstInvalidField) firstInvalidField = lastNameInput;
  }

  if (!emailRegex.test(email)) {
    isValid = false;
    showError(emailInput, "Invalid email format.");
    if (!firstInvalidField) firstInvalidField = emailInput;
  }

  const digitsOnly = phone.replace(/\D/g, "");
  if (digitsOnly.length < 7 || digitsOnly.length > 15) {
    isValid = false;
    showError(phoneInput, "Phone must be 7–15 digits.");
    if (!firstInvalidField) firstInvalidField = phoneInput;
  }

  if (!isValid) {
    firstInvalidField.scrollIntoView({ behavior: "smooth", block: "center" });
    firstInvalidField.focus();
    return;
  }

  form.reset();
  contactFormWrapper.style.display = "none";

  thankYouBox.classList.remove("hidden");

  const boxTop = thankYouBox.getBoundingClientRect().top + window.pageYOffset;
  const boxHeight = thankYouBox.offsetHeight;
  const windowHeight = window.innerHeight;

  window.scrollTo({
    top: boxTop - windowHeight / 2 + boxHeight / 2,
    behavior: "smooth",
  });
});

window.addEventListener("beforeunload", () => {
  thankYouBox.classList.add("hidden");
});

function showError(inputElement, message) {
  const error = document.createElement("div");
  error.classList.add("error-message");
  error.textContent = message;
  inputElement.insertAdjacentElement("afterend", error);
}
